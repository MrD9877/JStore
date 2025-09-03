import React, { Dispatch, SetStateAction } from "react";
type UploadImagesBtnType = {
  files: FileList;
  setFile: Dispatch<SetStateAction<FileList | undefined>>;
  uploadFiles: () => Promise<void>;
};
export default function UploadImagesBtn({ setFile, uploadFiles }: UploadImagesBtnType) {
  return (
    <div className="flex justify-center items-center fixed z-10 top-0 left-0 mx-auto h-full w-full  ">
      <div className="flex h-fit w-fit bg-black/85 px-10 py-10 rounded-xl">
        <div className="flex flex-col gap-4 justify-center">
          <h1 className="text-white text-center text-xl py-4">Upload Images:</h1>
          <div className="w-full grid grid-cols-2">
            <button
              type="button"
              onClick={() => setFile(undefined)}
              className="bg-red-600 whitespace-nowrap ml-2 h-fit text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-red-700 "
            >
              <span>Discard</span>
            </button>
            <button
              type="button"
              onClick={() => {
                uploadFiles();
                setFile(undefined);
              }}
              className="bg-blue-600 whitespace-nowrap ml-2 h-fit text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 "
            >
              <span>Upload</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
