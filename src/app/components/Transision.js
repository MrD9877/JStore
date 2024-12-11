"use client";
import { useActionState, useState } from "react";

function Transision() {
  const [name, setName] = useState();
  const [error, submitAction, isPending] = useActionState(async (previousState, newName) => {
    // const error = await updateName(formData.get("name"));
    const arr = Object.fromEntries(newName);
    console.log(arr);
    console.log(previousState, "previousState");
    const error = null;
    if (error) {
      return error;
    }
    // redirect("/path");
    return null;
  }, null);

  return (
    <>
      {name}
      <form action={submitAction}>
        <input type="text" name="name" />
        <button type="submit" disabled={isPending}>
          Update
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}
export default Transision;
