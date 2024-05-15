import { useApp } from "@/providers/app";
import { Spinner } from "./Spinner";
import { useState } from "react";

export function Mint({
  backStep,
  currentPhoto,
}: {
  backStep: () => void;
  currentPhoto: string;
}) {
  const { isLoading, mintImage, mintImageWithoutAi } = useApp();
  const [isChecked, setIsChecked] = useState(false)
  const handleCheck = () => setIsChecked(!isChecked)
  const [mintTitle, setMintTitle] = useState('')
  const [mintDescription, setMintDescription] = useState('')

  const updateTitle = (event: any) => setMintTitle(event.target.value)
  const updateDescription = (event: any) => setMintDescription(event.target.value)


  return (
    <main className="h-camera w-screen flex flex-col items-center margin-mint scroll-y">
      {isLoading ? (
        <>
          {" "}
          <Spinner />
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-mainText text-center">
            Uploading your image...
          </h1>
        </>
      ) : (
        <div className="h-full w-64 md:h-96 md:w-96 flex flex-col gap-4">
          <img src={currentPhoto} />

          <div className="flex gap-4 w-full containerCol">

            <div className="titleInputContainer">
              <div>
                <p>Title</p>
                <input className="w-full flex inputStyle" type="text" disabled={isChecked} onChange={updateTitle} />
              </div>

              <div>
                <p>Description</p>
                <textarea className="w-full flex inputStyle" disabled={isChecked} onChange={updateDescription} />
              </div>

              <div className="tempRow w-full py-2">
                <input type="checkbox" onClick={handleCheck} checked={isChecked} />
                <p className="px-1">Use AI for Title & Description</p>
              </div>
              
            </div>
            
            <button
              className="text-secondaryBtnText w-full border border-secondaryBtnText rounded px-4 py-2"
              onClick={backStep}
            >
              Try again
            </button>
            <button
              className="gradientButton w-full text-primaryBtnText rounded px-4 py-2"
              onClick={() => isChecked ? mintImage(currentPhoto) : mintImageWithoutAi(currentPhoto, {title: mintTitle, description: mintDescription})}
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
