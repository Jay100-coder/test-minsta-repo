import { FirstTokenProps } from "@/data/types";
import { MemoizedImageThumb } from "./feed/ImageThumb";


const filterDates = [{eventName: 'BTC Pizza', date: "2024-05-22"}]

export const FirstToken = (
  firstTokenProps: FirstTokenProps,
): JSX.Element | null => {

// if error message comes from first token fetch it will remove it from render
  if (firstTokenProps?.isFirstTokenError) {

    return null;
  }

  if(firstTokenProps.addFilter === "BTC Pizza"){
    const date = filterDates.filter((date) => date.eventName === firstTokenProps.addFilter)
    const matchingDate = firstTokenProps.newToken?.createdAt.split("T")[0] === date[0].date


    return (!firstTokenProps?.newToken?.media || firstTokenProps?.isLoading) && matchingDate === false ? (
      <div
        className="md:aspect-square rounded overflow-x-hidden cursor-pointer sm:w-full md:w-72 h-72 xl:w-80 xl:h-80 relative"
        key={1}
      >
        <div className="rounded animate-pulse w-full h-full bg-gray-600 dark:bg-gray-800" />
      </div>
    ) : (!firstTokenProps?.firstTokenisBlocked ||
      typeof firstTokenProps?.firstTokenisBlocked == "undefined") && matchingDate === true ? (
      <MemoizedImageThumb
        key={firstTokenProps?.newToken?.media}
        token={firstTokenProps?.newToken}
        index={1}
      />
    ) : null;
  }

  return !firstTokenProps?.newToken?.media || firstTokenProps?.isLoading ? (
    <div
      className="md:aspect-square rounded overflow-x-hidden cursor-pointer sm:w-full md:w-72 h-72 xl:w-80 xl:h-80 relative"
      key={1}
    >
      <div className="rounded animate-pulse w-full h-full bg-gray-600 dark:bg-gray-800" />
    </div>
  ) : !firstTokenProps?.firstTokenisBlocked ||
    typeof firstTokenProps?.firstTokenisBlocked == "undefined" ? (
    <MemoizedImageThumb
      key={firstTokenProps?.newToken?.media}
      token={firstTokenProps?.newToken}
      index={1}
    />
  ) : null;
};
