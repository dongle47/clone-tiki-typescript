import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";

import { DebounceInput } from "react-debounce-input";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HistoryIcon from "@mui/icons-material/History";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { SearchState, searchActions, selectSearch } from "./searchSlice";

export interface ISearchProps {}

export default function Search(props: ISearchProps) {
  const dispatch = useAppDispatch();

  const searchedItems = useAppSelector(selectSearch);

  const [searchText, setSearchText] = useState("");

  const [focusSearch, setFocusSearch] = useState(false);

  const [expandSearch, setExpandSearch] = useState(false);

  const onChangeSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    document.addEventListener("click", (event: any) => {
      const searchResultElement = document.getElementById(
        "input-search-result"
      );

      if (searchResultElement) {
        const isClickInsideElement = searchResultElement.contains(event.target);
        if (!isClickInsideElement && event.target.id !== "input-search") {
          setFocusSearch(false);
        }
      }
    });
    return () => document.removeEventListener("click", () => {});
  }, []);

  const handleSubmitSearch = () => {
    let obj: SearchState = {
      searchText: searchText,
      slug: searchText.replace(/\s/g, "-"),
      type: "filter",
    };
    dispatch(searchActions.addItem(obj));
    // navigate(`search/${obj.slug}`);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ padding: "0", height: "40px", flex: 1, position: "relative" }}
    >
      <DebounceInput
        style={{ height: "100%", flex: 1 }}
        id="input-search"
        placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
        onFocus={() => setFocusSearch(true)}
        value={searchText}
        onChange={onChangeSearch}
        debounceTimeout={500}
      />

      {focusSearch && (
        <Stack
          sx={{
            borderTop: "1px solid silver",
            paddingTop: "0.8rem",
            px: "1rem",
          }}
          id="input-search-result"
          className="header-search__result"
        >
          <Button
            onClick={() => setExpandSearch((prev) => !prev)}
            variant="text"
            endIcon={
              expandSearch ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
          >
            {expandSearch ? "Thu gọn" : "Xem thêm"}
          </Button>
        </Stack>
      )}

      <Button
        sx={{
          height: "100%",
          width: "8rem",
          backgroundColor: "#0D5CB6",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
        }}
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleSubmitSearch}
      >
        Tìm kiếm
      </Button>
    </Stack>
  );
}
