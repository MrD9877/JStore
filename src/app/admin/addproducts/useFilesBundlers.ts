import useToast from "@/hooks/useToast";
import { useState } from "react";
import { getUploadDataBundler } from "./fetchSignUrls";
import z from "zod";

const PreSignedSchema = z.array(
  z.object({
    presignedUrl: z.string(),
    imageId: z.string(),
    name: z.string(),
  })
);

export default function useFiles(files: FileList | undefined) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>();

  const getBundlerUploadURL = async (
    uploadData: {
      buffer: Buffer<ArrayBuffer>;
      fileType: string;
      name: string;
    }[]
  ) => {
    const data = uploadData.map((data) => ({ ContentType: data.fileType, name: data.name }));
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/signedUrl`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resData = (await res.json()) as { presignedUrl: string; imageId: string }[];
    const parsedData = await PreSignedSchema.parseAsync(resData);
    setImages(() => parsedData.map((d) => d.imageId));
    return parsedData;
  };

  const uploadFiles = async () => {
    if (!files || files.length === 0) {
      toast("Please add files to Upload");
      return;
    }
    setLoading(true);

    const uploadData = await getUploadDataBundler(files);
    const urls = await getBundlerUploadURL(uploadData);

    try {
      for (let i = 0; i < uploadData.length; i++) {
        const data = uploadData[i];
        const url = urls.find((d) => d.name === data.name);
        if (!url) throw Error("Upload Error Try again");
        const res = await fetch(url.presignedUrl, {
          method: "PUT",
          body: data.buffer,
          headers: {
            "Content-Type": data.fileType,
          },
          mode: "cors",
        });
        if (res.ok) {
          toast("Images Saved ✓");
        }
      }
    } catch (error) {
      toast("Failed to upload files");
    } finally {
      setLoading(false);
    }
  };

  return { uploadFiles, images, loading };
}
