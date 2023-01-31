import React from "react";
import "./Footer.scss";
import nhanhieu from "../../../assets/img/nhan-hieu.png";
import tikinow from "../../../assets/img/tikinow.jpg";
import fb from "../../../assets/img/fb.jpg";
import youtube from "../../../assets/img/ytb.jpg";
import zalo from "../../../assets/img/zalo.jpg";
import { Stack, Typography, Box } from "@mui/material";

export interface IFooterProps {}

export function Footer(props: IFooterProps) {
  return (
    <Box className="Footer">
      <Stack className="block" direction="row">
        <Stack>
          <Typography component="h4" className="block__title">
            Hỗ trợ khách hàng
          </Typography>
          <div className="hotline">
            Hotline:&nbsp;
            <a href="tel:1900-6035"> 1900-6035</a>
            <span className="small-text" style={{ marginRight: "1rem" }}>
              (1000 đ/phút, 8-21h kể cả T7, CN)
            </span>
          </div>
          {footerLink.supportCustomer.map((item) => (
            <a key={item.id} href={item.link}>
              {item.display}
            </a>
          ))}

          <div className="security">
            Hỗ trợ khách hàng:&nbsp;
            <a href="mailto:hotro@tiki.vn">hotro@tiki.vn</a>
          </div>
          <div className="security">
            Báo lỗi bảo mật:&nbsp;
            <a href="mailto:security@tiki.vn">security@tiki.vn</a>
          </div>
        </Stack>

        <Stack>
          <Typography component="h4" className="block__title">
            Về Tiki
          </Typography>
          {footerLink.aboutTiki.map((item) => (
            <a key={item.id} href={item.link}>
              {item.display}
            </a>
          ))}
        </Stack>

        <Stack>
          <Box>
            <Typography component="h4" className="block__title">
              Hợp tác và liên kết
            </Typography>
            <a href={"https://tiki.vn/quy-che-hoat-dong-sgdtmdt"}>
              Quy chế hoạt động Sàn GDTMĐT
            </a>
            <a href={"https://tiki.vn/khuyen-mai/ban-hang-cung-tiki"}>
              Bán hàng cùng Tiki
            </a>
          </Box>
          <Box>
            <Typography
              component="h4"
              sx={{ marginTop: "16px" }}
              className="block__title"
            >
              Chứng nhận bởi
            </Typography>
            <Stack direction="row" spacing={1}>
              <a href={"https://hotro.tiki.vn/s/"} style={{ height: "32px" }}>
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
                  width="32"
                  height="32"
                  alt=""
                />
              </a>
              <a
                href={"http://online.gov.vn/Home/WebDetails/21193"}
                style={{ height: "32px" }}
              >
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                  height="32"
                  width="83"
                  alt=""
                />
              </a>
            </Stack>
          </Box>
        </Stack>

        <Stack>
          <Box>
            <Typography component="h4" className="block__title">
              Phương thức thanh toán
            </Typography>
            <img alt="" src={nhanhieu} style={{ maxWidth: "200px" }} />
          </Box>
          <Box>
            <Typography
              component="h4"
              style={{ margin: "16px 0 12px" }}
              className="block__title"
            >
              Dịch vụ giao hàng
            </Typography>
            <a href="/">
              <img alt="" src={tikinow}></img>
            </a>
          </Box>
        </Stack>

        <Stack>
          <Box>
            <Typography component="h4" className="block__title">
              Kết nối với chúng tôi
            </Typography>
            <Stack direction="row" spacing={1} mb={1}>
              <a href="https://www.facebook.com/tiki.vn/">
                <img width="32px" height="32px" alt="" src={fb} />
              </a>
              <a href="https://www.youtube.com/user/TikiVBlog">
                <img width="32px" height="32px" alt="" src={youtube} />
              </a>
              <a href="http://zalo.me/589673439383195103">
                <img width="32px" height="32px" alt="" src={zalo} />
              </a>
            </Stack>
          </Box>
          <Box>
            <Typography component="h4" className="block__title">
              Tải ứng dụng trên điện thoại
            </Typography>
            <Stack direction="row" spacing={1.25}>
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png"
                width="80"
                height="80"
                alt=""
              />
              <Stack direction="column">
                <a
                  href={"https://itunes.apple.com/vn/app/id958100553"}
                  style={{ height: "36px" }}
                >
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
                    width="122px"
                    alt=""
                  />
                </a>
                <a
                  href={
                    "https://play.google.com/store/apps/details?id=vn.tiki.app.tikiandroid"
                  }
                  style={{ height: "36px" }}
                >
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
                    width="122px"
                    alt=""
                  />
                </a>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>

      <Box className="container address-info">
        <Typography>
          Trụ sở chính: Tòa nhà Viettel, Số 285, đường Cách Mạng Tháng 8, phường
          12, quận 10, Thành phố Hồ Chí Minh
        </Typography>

        <Typography>
          Tiki nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và
          nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng
        </Typography>

        <Typography>
          Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch và Đầu
          tư Thành phố Hồ Chí Minh cấp lần đầu ngày 06/01/2010 và sửa đổi lần
          thứ 23 ngày 14/02/2022
        </Typography>

        <Typography style={{ marginBottom: "0" }}>
          © 2022 - Bản quyền của Công ty TNHH Ti Ki
        </Typography>
      </Box>
    </Box>
  );
}

const footerLink = {
  supportCustomer: [
    {
      id: 1,
      link: "https://hotro.tiki.vn/s/",
      display: "Các câu hỏi thường gặp",
    },
    {
      id: 2,
      link: "https://tiki.vn/lien-he/gui-yeu-cau",
      display: "Gửi yêu cầu hỗ trợ",
    },
    {
      id: 3,
      link: "https://hotro.tiki.vn/s/article/lam-the-nao-de-toi-dat-hang-qua-website-tiki",
      display: "Hướng dẫn đặt hàng",
    },
    {
      id: 4,
      link: "https://hotro.tiki.vn/s/article/dich-vu-giao-hang-tiet-kiem",
      display: "Phương thức vận chuyển",
    },
    {
      id: 5,
      link: "https://hotro.tiki.vn/s/article/chinh-sach-doi-tra-san-pham-tai-tiki-nhu-the-nao",
      display: "Chính sách đổi trả",
    },
    {
      id: 6,
      link: "https://tiki.vn/khuyen-mai/huong-dan-tra-gop",
      display: "Hướng dẫn trả góp",
    },
    {
      id: 7,
      link: "https://hotro.tiki.vn/s/article/dich-vu-giao-hang-tu-nuoc-ngoai",
      display: "Chính sách hàng nhập khẩu",
    },
  ],
  aboutTiki: [
    {
      id: 1,
      link: "https://tiki.vn/thong-tin/gioi-thieu-ve-tiki",
      display: "Giới thiệu Tiki",
    },
    {
      id: 2,
      link: "https://tuyendung.tiki.vn/",
      display: "Tuyển dụng",
    },
    {
      id: 3,
      link: "https://tiki.vn/bao-mat-thanh-toan",
      display: "Chính sách bảo mật thanh toán",
    },
    {
      id: 4,
      link: "https://tiki.vn/bao-mat-thong-tin-ca-nhan",
      display: "Chính sách bảo mật thông tin cá nhân",
    },
    {
      id: 5,
      link: "https://hotro.tiki.vn/s/article/chinh-sach-giai-quyet-khieu-nai",
      display: "Chính sách giải quyết khiếu nại",
    },
    {
      id: 6,
      link: "https://hotro.tiki.vn/s/article/dieu-khoan-su-dung",
      display: "Điều khoản sử dụng",
    },
    {
      id: 7,
      link: "https://hotro.tiki.vn/s/article/tiki-xu-la-gi",
      display: "Giới thiệu Tiki Xu",
    },
    {
      id: 8,
      link: "https://tiki.vn/sep/home",
      display: "SEP - Mua sắm có lời",
    },
    {
      id: 9,
      link: "https://tiki.vn/khuyen-mai/tiki-tiep-thi-lien-ket",
      display: "Tiếp thị liên kết cùng Tiki",
    },
    {
      id: 10,
      link: "https://tiki.vn/chuong-trinh/ban-hang-doanh-nghiep",
      display: "Bán hàng doanh nghiệp",
    },
    {
      id: 11,
      link: "https://www.tikinow.biz/%C4%91i%E1%BB%81u-kho%E1%BA%A3n-v%E1%BA%ADn-chuy%E1%BB%83n",
      display: "Điều kiện vận chuyển",
    },
  ],
};
