import { Dispatch, SetStateAction } from "react";
import { ButtonSecondary } from "./Button";

type PaginationProps = {
  setOffset: Dispatch<SetStateAction<number>>;
  offset: number;
  pageDisplayNum: number;
};

export const Pagination = ({
  setOffset,
  offset,
  pageDisplayNum,
}: PaginationProps) => {
  const handleClickPrev = () => {
    setOffset((num) => (num < pageDisplayNum ? 0 : num - pageDisplayNum));
  };
  const handleClickNext = () => {
    setOffset((num) => num + pageDisplayNum);
  };

  return (
    <div className="flex gap-2">
      <ButtonSecondary
        type="button"
        onClick={handleClickPrev}
        disabled={offset < 1}
      >
        前へ
      </ButtonSecondary>
      <ButtonSecondary type="button" onClick={handleClickNext}>
        次へ
      </ButtonSecondary>
    </div>
  );
};
