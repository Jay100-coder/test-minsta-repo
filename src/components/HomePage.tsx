"use client";

import { useHomePageData } from "@/hooks/useHomePageData";
import { useMbWallet } from "@mintbase-js/react";
import { useRouter } from "next/navigation";
import { DynamicGrid } from "./DynamicGrid";
import { FirstFeed } from "./FirstFeed";
import { FirstToken } from "./FirstToken";
import { FeedScroll } from "./feed/feedscroll";
import { useState } from "react";


export const HomePage = () => {
  const {
    firstTokenProps,
    tokensFetched,
    blockedNfts,
    totalLoading,
    totalNfts,
  } = useHomePageData();

  const { connect, isConnected } = useMbWallet();
  const [selectedValue, setSelectedValue] = useState('All');
  const [ownerID, setOwnerID] = useState("");

  const router = useRouter();

  const handleLetsGoBtn = () => {
    if (!isConnected) {
      connect();
    } else {
      router.push("/camera");
    }
  };

  const DropDown = () => {
    const handleChange = (e:any) => {
      setSelectedValue(e.target.value)
    }
  
    return (
    <>
      <label htmlFor="filter">
        <span>Filter By: </span>
        <select name="filter" value={selectedValue} onChange={handleChange}>
       <option value="All">All Mints</option>
       <option value="BTC Pizza">BTC Pizza Day</option>
     </select>
      </label>
    </>
    );
  
  }

  return !totalLoading && !totalNfts ? (
    <main className="flex flex-col items-center justify-center h-screen">
      <p className="text-mainText">Nothing here yet 👀</p>
      <button
        className="gradientButton w-auto text-primaryBtnText rounded px-8 py-2 mt-4"
        onClick={handleLetsGoBtn}
      >
        Let&apos;s Go
      </button>
    </main>
  ) : (
    <main className="py-20 lg:px-12 mx-auto flex flex-col items-center justify-center space-y-4 ">
      <DropDown />
      {selectedValue === "By Owner" && (<><input type="text" className="filterInput" name="" id="" onChange={(e) => {setOwnerID(e.target.value)}} /></>)}


      <DynamicGrid>
        <FirstToken {...firstTokenProps} {...{addFilter: selectedValue}} />
        <FirstFeed tokensFetched={tokensFetched} blockedNfts={blockedNfts} />
        <FeedScroll blockedNfts={blockedNfts} addFilter={selectedValue} />
      </DynamicGrid>
    </main>
  );
};
