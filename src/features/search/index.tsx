import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";

import { Link } from "react-router-dom";

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

  const [suggestions, setSuggestions] = useState([]);

  const [focusSearch, setFocusSearch] = useState(false);

  const [expandSearch, setExpandSearch] = useState(false);

  const onChangeSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleRemoveSearch = (slug: string) => {
    dispatch(searchActions.removeItem(slug));
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

  const SearchedItems = searchedItems
    .slice(0, 5)
    .map((item) => (
      <SearchedItem
        text={item.searchText}
        slug={item.slug}
        type={item.type}
        handleRemoveSearch={handleRemoveSearch}
      />
    ));

  // const SuggestItems = suggestions
  //   .slice(0, 5)
  //   .map((item) => (
  //     <SuggestItem
  //       handleClickSuggestItem={handleClickSuggestItem}
  //       setSearchText={props.setSearchText}
  //       text={item.name}
  //       slug={item.slug}
  //     />
  //   ));

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
          {searchText === "" && SearchedItems}
          {/* {searchText === "" ? <SearchedItems /> : SuggestItems} */}

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

interface ISearchItemProp {
  slug: string;
  text: string;
  type: "filter" | "product";
  handleRemoveSearch: (slug: string) => void;
}

function SearchedItem(props: ISearchItemProp) {
  return (
    <Stack
      className="item-search"
      sx={{ height: "2.5rem" }}
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <HistoryIcon fontSize="medium" sx={{ color: "silver" }} />

      <Link style={{ flex: 1 }} to={`search/${props.slug}`}>
        <Typography
          sx={{ fontSize: "0.8rem", fontWeight: 500 }}
          className="text-overflow-1-lines"
          variant="subtitle2"
          // onClick={() => props.setSearchText(props.text)}
        >
          {props.text}
        </Typography>
      </Link>

      <IconButton onClick={() => props.handleRemoveSearch(props.slug)}>
        <ClearIcon sx={{ color: "silver" }}></ClearIcon>
      </IconButton>
    </Stack>
  );
}

function SuggestItem(props: ISearchItemProp) {
  let obj = {
    text: props.text,
    slug: props.slug,
  };
  return (
    <Link to={`/product/${props.slug}`}>
      <Stack
        className="item-search"
        sx={{ height: "2.5rem" }}
        direction="row"
        spacing={2}
        alignItems="center"
        // onClick={() => props.handleClickSuggestItem(obj)}
      >
        <SearchIcon fontSize="medium" sx={{ color: "silver" }} />

        <Typography
          className="text-overflow-1-lines"
          variant="subtitle2"
          sx={{ fontSize: "0.8rem", fontWeight: 500, flex: 1 }}
        >
          {props.text}
        </Typography>
      </Stack>
    </Link>
  );
}
