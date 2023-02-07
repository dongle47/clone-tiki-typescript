import { useState, useEffect } from "react";

import "./FilterProduct.scss";
import {
  Stack,
  Box,
  Button,
  Typography,
  FormGroup,
  Grid,
  Tab,
  Tabs,
  Radio,
  Slider,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";

import { useParams } from "react-router-dom";
import productApi from "api/productApi";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CardProduct } from "components/Common";
import { Product } from "models";

export interface IFilterProductProps {}

export default function FilterProduct(props: IFilterProductProps) {
  const [isLoading, setIsLoading] = useState(false);

  const searchText = useParams().slug;

  const [valuePrice, setValuePrice] = useState([0, 100]);

  const [value, setValue] = useState(0);

  const [minRate, setMinRate] = useState(3);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const getSuggestions = async () => {
      let param = {
        searchText: searchText,
        minRate: minRate,
        minPrice: valuePrice[0] * 100000,
        maxPrice: valuePrice[1] * 100000,
      };
      await productApi.getFilterProducts(param).then((res) => {
        setIsLoading(false);
        setFilteredProducts(res);
      });
    };
    getSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleApply = () => {
    setIsLoading(true);

    let param = {
      searchText: searchText,
      minRate: minRate,
      minPrice: valuePrice[0] * 100000,
      maxPrice: valuePrice[1] * 100000,
    };

    productApi.getFilterProducts(param).then((res) => {
      setIsLoading(false);
      setFilteredProducts(res);
    });
  };

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleChangeMinRate = (event: any) => {
    setMinRate(event.target.value);
  };

  const handleChangePrice = (event: any, newValue: any) => {
    setValuePrice(newValue);
  };

  return (
    <Stack className="filterProduct container" direction="row" spacing={1}>
      <Stack className="filterProduct__sidebar" direction="column">
        <Box className="filterProduct__form">
          <Typography className="filterProduct__title">Đánh giá</Typography>

          <FormGroup>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={minRate}
              onChange={handleChangeMinRate}
            >
              <FormControlLabel
                value={5}
                control={<Radio />}
                label="Từ 5 sao"
              />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label="Từ 4 sao"
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="Từ 3 sao"
              />
              <FormControlLabel value={0} control={<Radio />} label="Tất cả" />
            </RadioGroup>
          </FormGroup>
        </Box>

        <Box sx={{ height: "15rem" }}>
          <Typography className="filterProduct__title">Khoảng giá</Typography>

          <Slider
            getAriaLabel={() => "Khoảng giá"}
            value={valuePrice}
            onChange={handleChangePrice}
            valueLabelDisplay="off"
            // getAriaValueText={valuetext}
            marks={marks}
            orientation="vertical"
          />
        </Box>

        <Button
          sx={{ marginTop: "5rem" }}
          variant="outlined"
          onClick={handleApply}
        >
          Áp dụng
        </Button>
      </Stack>

      <Box sx={{ flex: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="basic tabs example"
          >
            {tabs.map((item) => (
              <Tab
                key={item.id}
                label={item.name}
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Box>
          {isLoading ? (
            <Box sx={{ width: "100%", height: "100%" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {filteredProducts.map((item: Product) => (
                <Grid key={item.id} item xs={3}>
                  <CardProduct data={item} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Stack>
  );
}

const marks = [
  {
    value: 0,
    label: "0 triệu",
  },
  {
    value: 10,
    label: "1 triệu",
  },
  {
    value: 20,
    label: "2 triệu",
  },
  {
    value: 30,
    label: "3 triệu",
  },
  {
    value: 40,
    label: "4 triệu",
  },
  {
    value: 50,
    label: "5 triệu",
  },
  {
    value: 60,
    label: "6 triệu",
  },
  {
    value: 70,
    label: "7 triệu",
  },
  {
    value: 80,
    label: "8 triệu",
  },
  {
    value: 90,
    label: "9 triệu",
  },
  {
    value: 100,
    label: "10 triệu",
  },
];

const tabs = [
  {
    id: 1,
    name: "Phổ biến",
  },
  {
    id: 2,
    name: "Bán chạy",
  },
  {
    id: 3,
    name: "Hàng mới",
  },
  {
    id: 4,
    name: "Giá thấp",
  },
  {
    id: 5,
    name: "Giá cao",
  },
];
