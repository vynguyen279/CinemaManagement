USE [master]
GO
/****** Object:  Database [QLRCP]    Script Date: 7/7/2023 1:04:52 PM ******/
CREATE DATABASE [QLRCP]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QLRCP', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\QLRCP.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'QLRCP_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\QLRCP_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [QLRCP] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QLRCP].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QLRCP] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QLRCP] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QLRCP] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QLRCP] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QLRCP] SET ARITHABORT OFF 
GO
ALTER DATABASE [QLRCP] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [QLRCP] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QLRCP] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QLRCP] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QLRCP] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QLRCP] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QLRCP] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QLRCP] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QLRCP] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QLRCP] SET  DISABLE_BROKER 
GO
ALTER DATABASE [QLRCP] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QLRCP] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QLRCP] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QLRCP] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QLRCP] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QLRCP] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QLRCP] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QLRCP] SET RECOVERY FULL 
GO
ALTER DATABASE [QLRCP] SET  MULTI_USER 
GO
ALTER DATABASE [QLRCP] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [QLRCP] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QLRCP] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QLRCP] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [QLRCP] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [QLRCP] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'QLRCP', N'ON'
GO
ALTER DATABASE [QLRCP] SET QUERY_STORE = OFF
GO
USE [QLRCP]
GO
/****** Object:  Table [dbo].[KHACH_HANG]    Script Date: 7/7/2023 1:04:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KHACH_HANG](
	[MaKH] [int] IDENTITY(1,1) NOT NULL,
	[TenKH] [nvarchar](50) NOT NULL,
	[NgaySinh] [date] NOT NULL,
	[SDT] [varchar](10) NOT NULL,
	[DiaChi] [nvarchar](50) NOT NULL,
	[GioiTinh] [bit] NOT NULL,
	[Email] [varchar](50) NOT NULL,
 CONSTRAINT [PK_KHACH_HANG] PRIMARY KEY CLUSTERED 
(
	[MaKH] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LICH_CHIEU]    Script Date: 7/7/2023 1:04:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LICH_CHIEU](
	[NgayChieu] [date] NOT NULL,
	[MaPhong] [varchar](10) NOT NULL,
	[MaPhim] [int] NOT NULL,
	[MaSuatChieu] [int] IDENTITY(1,1) NOT NULL,
	[GioChieu] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaSuatChieu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LOAIVE]    Script Date: 7/7/2023 1:04:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LOAIVE](
	[MaLV] [varchar](10) NOT NULL,
	[TenLV] [nvarchar](50) NOT NULL,
	[Gia] [money] NOT NULL,
 CONSTRAINT [PK_LOAIVE] PRIMARY KEY CLUSTERED 
(
	[MaLV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NHAN_VIEN]    Script Date: 7/7/2023 1:04:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NHAN_VIEN](
	[TenNV] [nvarchar](50) NOT NULL,
	[NgaySinh] [date] NOT NULL,
	[CMND] [varchar](12) NOT NULL,
	[SDT] [varchar](10) NOT NULL,
	[DiaChi] [nvarchar](50) NOT NULL,
	[GioiTinh] [bit] NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[TrangThai] [bit] NOT NULL,
	[MaNV] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaNV] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PHIM]    Script Date: 7/7/2023 1:04:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PHIM](
	[TenPhim] [nvarchar](100) NOT NULL,
	[MoTa] [nvarchar](1000) NULL,
	[NuocSX] [nvarchar](10) NULL,
	[NgayKhoiChieu] [date] NOT NULL,
	[NamSX] [int] NOT NULL,
	[DaoDien] [nvarchar](50) NULL,
	[ThoiLuong] [int] NULL,
	[MaPhim] [int] IDENTITY(1,1) NOT NULL,
	[Link] [varchar](8000) NULL,
	[MaTT] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaPhim] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PHONG]    Script Date: 7/7/2023 1:04:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PHONG](
	[MaPhong] [varchar](10) NOT NULL,
	[TrangThai] [bit] NOT NULL,
	[TongSoGhe] [int] NOT NULL,
 CONSTRAINT [PK_Phong] PRIMARY KEY CLUSTERED 
(
	[MaPhong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QUYEN]    Script Date: 7/7/2023 1:04:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QUYEN](
	[MaQuyen] [varchar](10) NOT NULL,
	[TenQuyen] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_CHUC_VU] PRIMARY KEY CLUSTERED 
(
	[MaQuyen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TAIKHOAN]    Script Date: 7/7/2023 1:04:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TAIKHOAN](
	[Email] [varchar](50) NOT NULL,
	[MaQuyen] [varchar](10) NOT NULL,
	[Password] [char](50) NOT NULL,
 CONSTRAINT [PK__TAIKHOAN__A9D1053551FB21C0] PRIMARY KEY CLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[THE_LOAI]    Script Date: 7/7/2023 1:04:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[THE_LOAI](
	[MaTL] [varchar](10) NOT NULL,
	[TenTL] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_CHI_TIET_THE_LOAI] PRIMARY KEY CLUSTERED 
(
	[MaTL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[THE_LOAI_PHIM]    Script Date: 7/7/2023 1:04:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[THE_LOAI_PHIM](
	[MaTL] [varchar](10) NOT NULL,
	[MaPhim] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaTL] ASC,
	[MaPhim] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VE]    Script Date: 7/7/2023 1:04:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VE](
	[MaSuatChieu] [int] NOT NULL,
	[MaKH] [int] NULL,
	[SoGhe] [int] NOT NULL,
	[NgayBan] [date] NOT NULL,
	[MaLV] [varchar](10) NOT NULL,
	[MaNV] [int] NULL,
	[MaVe] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaVe] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[KHACH_HANG] ON 

INSERT [dbo].[KHACH_HANG] ([MaKH], [TenKH], [NgaySinh], [SDT], [DiaChi], [GioiTinh], [Email]) VALUES (1, N'Trần Thị Kim Oanh', CAST(N'2001-02-05' AS Date), N'0815436736', N'Đăk Lăk', 0, N'n19dccn154@student.ptithcm.edu.vn')
INSERT [dbo].[KHACH_HANG] ([MaKH], [TenKH], [NgaySinh], [SDT], [DiaChi], [GioiTinh], [Email]) VALUES (2, N'Thùy Trang 1', CAST(N'2022-06-09' AS Date), N'0917057613', N'Phan Thiết - Bình Thuận', 0, N'lethithuytrang20070805@gmail.com')
INSERT [dbo].[KHACH_HANG] ([MaKH], [TenKH], [NgaySinh], [SDT], [DiaChi], [GioiTinh], [Email]) VALUES (3, N'Đỗ Đức Hậu', CAST(N'2001-11-05' AS Date), N'0377359729', N'97 Man Thiện - phường Hiệp Phú - Quận 9', 1, N'duchau051113@gmail.com')
INSERT [dbo].[KHACH_HANG] ([MaKH], [TenKH], [NgaySinh], [SDT], [DiaChi], [GioiTinh], [Email]) VALUES (4, N'Trần Thị Kim Oanh', CAST(N'2001-02-05' AS Date), N'0815436736', N'Đăk Lăk', 0, N'tranthikimoanh@gmail.com')
INSERT [dbo].[KHACH_HANG] ([MaKH], [TenKH], [NgaySinh], [SDT], [DiaChi], [GioiTinh], [Email]) VALUES (6, N'Yến Khoa', CAST(N'2005-12-17' AS Date), N'0796815754', N'Hà Nội', 0, N'trieuthiyenkhoa@gmail.com')
INSERT [dbo].[KHACH_HANG] ([MaKH], [TenKH], [NgaySinh], [SDT], [DiaChi], [GioiTinh], [Email]) VALUES (7, N'test', CAST(N'2001-10-13' AS Date), N'0974146540', N'Vùng Tàu', 0, N'test@gmail.com')
INSERT [dbo].[KHACH_HANG] ([MaKH], [TenKH], [NgaySinh], [SDT], [DiaChi], [GioiTinh], [Email]) VALUES (8, N'Yến Khoa 1', CAST(N'2010-11-17' AS Date), N'0796815754', N'Hà Nội', 0, N'trieuthiyenkhoa0202@gmail.com')
SET IDENTITY_INSERT [dbo].[KHACH_HANG] OFF
GO
SET IDENTITY_INSERT [dbo].[LICH_CHIEU] ON 

INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-31' AS Date), N'P01', 1, 4, 9)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-06-26' AS Date), N'P04', 1, 5, 9)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-06-25' AS Date), N'P02', 2, 6, 9)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-06-18' AS Date), N'P01', 1, 10, 9)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-31' AS Date), N'P02', 3, 11, 12)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-31' AS Date), N'P03', 5, 12, 12)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-31' AS Date), N'P04', 6, 13, 12)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-31' AS Date), N'P05', 1, 14, 12)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-31' AS Date), N'P01', 3, 15, 15)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-31' AS Date), N'P02', 2, 16, 15)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-31' AS Date), N'P03', 6, 17, 15)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-31' AS Date), N'P04', 1, 18, 15)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-27' AS Date), N'P05', 5, 19, 15)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-28' AS Date), N'P01', 1, 21, 9)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-28' AS Date), N'P02', 2, 22, 12)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-28' AS Date), N'P03', 3, 23, 9)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-30' AS Date), N'P01', 1, 24, 12)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-30' AS Date), N'P02', 2, 25, 12)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-06-18' AS Date), N'P02', 1, 26, 9)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-30' AS Date), N'P04', 4, 27, 12)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-30' AS Date), N'P05', 5, 28, 12)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-30' AS Date), N'P01', 2, 29, 21)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-30' AS Date), N'P02', 3, 30, 21)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-30' AS Date), N'P03', 4, 31, 21)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-30' AS Date), N'P04', 5, 32, 21)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-05-30' AS Date), N'P05', 6, 33, 21)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-06-24' AS Date), N'P01', 1, 34, 9)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-06-07' AS Date), N'P02', 2, 35, 21)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-06-01' AS Date), N'P01', 2, 36, 21)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-06-11' AS Date), N'P01', 2, 37, 15)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-06-11' AS Date), N'P01', 2, 38, 18)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-06-11' AS Date), N'P01', 2, 39, 21)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-06-12' AS Date), N'P01', 1, 40, 9)
INSERT [dbo].[LICH_CHIEU] ([NgayChieu], [MaPhong], [MaPhim], [MaSuatChieu], [GioChieu]) VALUES (CAST(N'2022-07-10' AS Date), N'P04', 2, 41, 18)
SET IDENTITY_INSERT [dbo].[LICH_CHIEU] OFF
GO
INSERT [dbo].[LOAIVE] ([MaLV], [TenLV], [Gia]) VALUES (N'LV01', N'ngày thường', 60000.0000)
INSERT [dbo].[LOAIVE] ([MaLV], [TenLV], [Gia]) VALUES (N'LV02', N'Cuối tuần', 90000.0000)
INSERT [dbo].[LOAIVE] ([MaLV], [TenLV], [Gia]) VALUES (N'LV03', N'ndadf', 340000.0000)
GO
SET IDENTITY_INSERT [dbo].[NHAN_VIEN] ON 

INSERT [dbo].[NHAN_VIEN] ([TenNV], [NgaySinh], [CMND], [SDT], [DiaChi], [GioiTinh], [Email], [TrangThai], [MaNV]) VALUES (N'Đỗ Đức Hậu 1', CAST(N'2001-11-05' AS Date), N'231306375', N'0377359729', N'97 Man Thiện - phường Hiệp Phú - Quận 9', 1, N'n19dccn053@student.ptithcm.edu.vn', 1, 1)
INSERT [dbo].[NHAN_VIEN] ([TenNV], [NgaySinh], [CMND], [SDT], [DiaChi], [GioiTinh], [Email], [TrangThai], [MaNV]) VALUES (N'Thùy Trang 1', CAST(N'2001-07-10' AS Date), N'261632489', N'0917057613', N'Hà Nội', 0, N'n19dccn207@student.ptithcm.edu.vn', 1, 2)
INSERT [dbo].[NHAN_VIEN] ([TenNV], [NgaySinh], [CMND], [SDT], [DiaChi], [GioiTinh], [Email], [TrangThai], [MaNV]) VALUES (N'kim oanh', CAST(N'2003-02-20' AS Date), N'211600', N'423', N'A6-hẻm 60', 0, N'kimoanh@gmail.com', 0, 5)
SET IDENTITY_INSERT [dbo].[NHAN_VIEN] OFF
GO
SET IDENTITY_INSERT [dbo].[PHIM] ON 

INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'578 PHÁT ĐẠN CỦA KẺ ĐIÊN', N'Hùng, một người cha sẵn sàng đánh đổi mọi thứ, thậm chí đặt mạng sống của mình vào hiểm nguy trong cuộc truy đuổi đơn độc nhưng vô cùng khốc liệt với kẻ ác để tìm lại công lý cho cô con gái bé nhỏ của mình. Nhưng điều anh không ngờ rằng phía sau kẻ ác đó lại là cả một thế lực ngầm …', N'Việt Nam1', CAST(N'2022-05-20' AS Date), 2022, N'Lương Đình Dũng', 1000, 1, N'https://www.cgv.vn/media/catalog/product/cache/1/small_image/190x260/052b7e4a4f6d2886829431e534ef7a43/p/o/poster_578_1__1.jpg', 0)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'BIỆT ĐỘI PHI HÀNH CÚN', N'Một xoáy nước kì lạ và nguy hiểm bất ngờ xuất hiện tại vùng biển Đại Tây Dương, thu hút sự chú ý của biệt đội phi hành cún. Được cử đến khu vực này để điều tra, hai phi hành cún quả cảm – Bạch Kim và Ánh Dương - đã khám phá ra một âm mưu to lớn đe doạ đến Trái Đất. Cùng với sự giúp đỡ của những người bạn tốt bụng, bộ đôi quyết định tìm cách ngăn chặn mưu đồ này, giải cứu Trái Đất và bảo vệ hoà bình vũ trụ.', N'Mỹ', CAST(N'2022-04-22' AS Date), 2022, N'Inna Evlannikova', 80, 2, N'https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/s/d/sd_main-poster_1_.jpg', 1)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'ĐÊM TỐI RỰC RỠ', N'Khi người ông qua đời, cả gia đình của Xuân Thanh (Nhã Uyên) tề tựu để đưa tiễn. Đám tang diễn ra hoành tráng, xôm tụ và đầy màu sắc. Bỗng dưng một đám người kéo đến đòi nợ trong sự ngỡ ngàng của tất cả. Những bí mật bị phanh phui, bi kịch chồng bi kịch, như một hệ luỵ tổn thương của nạn bạo hành gia đình đầy ám ảnh.', N'Việt Nam', CAST(N'2022-04-08' AS Date), 2022, N'Aaron Toronto', 102, 3, N'https://www.cgv.vn/media/catalog/product/cache/1/small_image/190x260/052b7e4a4f6d2886829431e534ef7a43/d/t/dtrr_main-poster_fb_1__1.jpg', 1)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'EM VÀ TRỊNH', N'Phim điện ảnh Em và Trịnh kể về cuộc đời của nhạc sĩ Trịnh Công Sơn từ khi còn trẻ đến tuổi trung niên, khi ông hoài niệm về những nàng thơ trong cuộc đời mình: Bích Diễm, Dao Ánh, Khánh Ly, Hồng Nhung...', N'Việt Nam', CAST(N'2022-06-17' AS Date), 2022, N'Phan Gia Nhật Linh', 100, 4, N'https://www.cgv.vn/media/catalog/product/cache/1/small_image/190x260/052b7e4a4f6d2886829431e534ef7a43/e/v/evt_couple_trinh-da_run_digital_1__1.jpg', 0)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'GÁNH NẶNG NGÀN CÂN CỦA TÀI NĂNG KIỆT XUẤT', N'Nick Cage (do chính Nicolas Cage thủ vai) là diễn viên từng đoạt giải Oscar đang gặp khó khăn về tài chính. Để nhận được khoản thù lao kếch xù 1 triệu USD lẫn giải cứu vợ con mình, anh phải đến dự tiệc sinh nhật của fan cuồng kiêm trùm tội phạm biến thái Javi.', N'Mỹ', CAST(N'2022-04-22' AS Date), 2022, N'Tom Gormican', 106, 5, N'https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/g/n/gnncctnkx_poster_1_.jpg', 2)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'JUJUTSU KAISEN 0 - CHÚ THUẬT HỒI CHIẾN', N'Yuta Okkotsu, một học sinh trung học giành được quyền kiểm soát một Linh hồn bị nguyền rủa cực kỳ mạnh mẽ và được Jujutsu Sorcerers đăng ký vào trường trung học Jujutsu tỉnh Tokyo để giúp anh ta kiểm soát sức mạnh của mình và để mắt đến anh ta.', N'Nhật Bản', CAST(N'2022-04-15' AS Date), 2022, N'Sunghoo Park', 105, 6, N'https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/o/poster_jujutsu_kaisen_1_.jpg', 1)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'LIÊN MINH SIÊU THÚ DC', N'Trong “Liên Minh Siêu Thú DC”, Siêu Cún Krypto và Superman là cặp bài trùng không thể tách rời, cùng sở hữu những siêu năng lực tương tự và cùng nhau chiến đấu chống lại tội phạm tại thành phố Metropolis. Khi Superman và những thành viên của Liên Minh Công Lý bị bắt cóc, Krypto phải thuyết phục cậu chàng Ace luộm thuộm, nàng Heo PB, Rùa Merton và Sóc Chip khai phá những sức mạnh tiềm ẩn và cùng nhau giải cứu các siêu anh hùng. “Liên Minh Siêu Thú DC” có sự góp giọng của bộ đôi ngôi sao nổi tiếng bậc nhất Hollywood Dwayne Johnson (lồng tiếng cho Siêu cún Krypto) và Kevin Hart (Superman). Đặc biệt, tài tử Keanu Reeves sẽ đảm nhận những câu thoại chất lừ đến từ Batman.', N'Mỹ', CAST(N'2022-07-29' AS Date), 2022, N'Jared Stern', 1000, 8, N'https://www.cgv.vn/media/catalog/product/cache/1/small_image/190x260/052b7e4a4f6d2886829431e534ef7a43/d/c/dc_league_super_pets-_teaser_poster_1__1.jpg', 0)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'MÈO ĐI HIA: ĐIỀU ƯỚC CUỐI CÙNG', N'Phần nối tiếp của Puss in Boots đã ra mắt từ 11 năm trước. Chú mèo đi hia sẽ chính thức trở lại màn ảnh lớn trong 1 chuyến phiêu lưu mới, vui nhộn hơn và cũng gay cấn hơn khi đã trót “tiêu xài” 8 trong số 9 cái mạng của mình.', N'Mỹ', CAST(N'2022-09-16' AS Date), 2022, N'Joel Crawford', 100, 9, N'https://www.cgv.vn/media/catalog/product/cache/1/small_image/190x260/052b7e4a4f6d2886829431e534ef7a43/p/u/puss-in-boots-poster_1.jpg', 0)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'NGÔI ĐỀN KỲ QUÁI 3', N'Hội tạo nghiệp tụ tập nhau đến dự lễ xuất gia của Aod nhưng phải hoãn lại do lời nguyền từ chiếc lắc chân xuất hiện. Min Jun, Balloon, First phải chạy đua với thời gian để tìm ra cách giải lời nguyền trước khi quỷ dữ đến lấy mạng Aod.', N'Thái Lan', CAST(N'2022-04-15' AS Date), 2022, N'Phontharis Chotkijsadarsopon', 110, 10, N'https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/e/peenak3-main_poster_1_.jpg', 1)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'NHÍM SONIC 2', N'Khi Robotnik tìm cách quay trở về Trái Đất thành công, ông ta có một đồng minh mới là Knuckles hùng mạnh, liệu Sonic và người bạn ới Tails có thể ngăn chặn được âm mưu điên rồi để cứu lấy thế giới?', N'Mỹ', CAST(N'2022-04-15' AS Date), 2022, N'Jeff Fowler', 122, 11, N'https://www.cgv.vn/media/catalog/product/cache/1/small_image/190x260/052b7e4a4f6d2886829431e534ef7a43/s/o/sonic_2_nkc_15.04_1__1.jpg', 1)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'NGHỀ SIÊU DỄ', N'Ông Thái là một cảnh sát về hưu nhưng không chịu an phận thủ thường, hàng ngày vẫn đi tìm bắt tội phạm vặt trong xóm cho đỡ nhớ nghề. Một ngày kia, Hoàng - tên trùm ma túy mới ra tù bỗng dưng chuyển đến xóm ông và mở một văn phòng bất động sản. Nghi ngờ đây là nơi làm ăn phi pháp, ông Thái quyết định âm thầm điều tra. Ông mua lại tiệm cơm tấm đối diện trụ sở của Hoàng để làm nơi theo dõi, đồng thời thu nạp Thu - Phú - Vinh - Mèo, đám thanh niên “bất hảo” trong xóm về quán hỗ trợ buôn bán để rảnh tay ', N'Việt Nam', CAST(N'2022-04-29' AS Date), 2022, N'Võ Thanh Hòa', 113, 12, N'https://www.cgv.vn/media/catalog/product/cache/1/small_image/190x260/052b7e4a4f6d2886829431e534ef7a43/r/s/rsz_nsd_main-poster_1.jpg', 1)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'PHI CÔNG SIÊU ĐẲNG MAVERICK', N'Sau hơn ba mươi năm phục vụ, Pete “Maverick” Mitchell từng nổi danh là một phi công thử nghiệm quả cảm hàng đầu của Hải quân, né tránh cơ hội thăng chức, điều khiến anh cảm thấy bị bó buộc, để trở về làm chính mình.', N'Mỹ', CAST(N'2022-05-27' AS Date), 2022, N'Joseph Kosinski', 100, 13, N'https://www.cgv.vn/media/catalog/product/cache/1/small_image/190x260/052b7e4a4f6d2886829431e534ef7a43/t/o/top_gun_maverick_-_poster_28.03_1__1.jpg', 0)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'QUA B?N LÀM CHI', N'Phim theo chân Tu?n (Thu?n Nguy?n) – chàng sinh viên khoa tài chính di?n trai d?n M? và sinh s?ng cùng chú Út (Quang Minh) c?a mình. T?i dây, anh dã g?p tr? lý c?a chú mình là Leo (Duy Khánh) - m?t anh chàng “say" anh nhu di?u d? và có cu?c d?ng d? d?y b?t ng? v?i Julie (Phuong TiTi) ngay t?i…phòng t?m! M?t ngày, anh và Julie b?t ng? nh?n du?c m?t d? ngh? d?y cám d? t? Leo...và m?i vi?c b?t d?u r?i tung lên theo m?t cách không ai lu?ng tru?c du?c.', N'Vi?t Nam', CAST(N'2022-04-08' AS Date), 2022, N'Nguy?n Trung Cang', 91, 14, N'https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/s/o/social-qblc.jpg', 1)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'SEVENTEEN POWER OF LOVE: THE MOVIE', N'Nhóm nhạc toàn cầu SEVENTEEN đang viết lại lịch sử Kpop trong dự án điện ảnh đầu tiên! Sau hàng loạt những giải thưởng như đạt album bạch kim tại Hàn Quốc, nằm trong bảng xếp hạng Billboard 200 của Mỹ trong 2 tuần liên tiếp cùng nhiều thành tích nổi bật khác trong bảng xếp hạng Oricon ở Nhật Bản, SEVENTEEN đã chứng minh sự thành công và sức ảnh hưởng của nhóm khi đang dần thống trị các bảng xếp hạng âm nhạc trên toàn cầu. Đừng bỏ lỡ SEVENTEEN POWER OF LOVE : THE MOVIE với những màn trình diễn mạnh mẽ cùng lời chia sẻ từ quá khứ đến hiện tại, cũng như những dự định trong tương lai mà 13 chàng trai muốn gửi gắm tới CARAT sẽ lần đầu được tiết lộ trong các cuộc phỏng vấn chuyên sâu!', N'Hàn', CAST(N'2022-04-20' AS Date), 2022, N'OH Yoon-Dong', 115, 15, N'https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/s/e/seventeen_global_vie_1_.jpg', 1)
INSERT [dbo].[PHIM] ([TenPhim], [MoTa], [NuocSX], [NgayKhoiChieu], [NamSX], [DaoDien], [ThoiLuong], [MaPhim], [Link], [MaTT]) VALUES (N'SINH VẬT HUYỀN BÍ: NHỮNG BÍ MẤT CỦA DUMBLEDORE', N'Câu chuyện của phần phim thứ ba này xoay quanh việc Giáo sư Albus Dumbledore (Jude Law) phát hiện ra việc Phù thủy Bóng tối quyền năng Gellert Grindelwald (Mads Mikkelsen) đang âm mưu chiếm lấy quyền kiểm soát Thế giới Phù thủy. Không thể một mình ngăn chặn đoàn quân hùng mạnh của của Grindelwald, Dumbledore đặt niềm tin vào Nhà nghiên cứu sinh vật huyền bí Newt Scamander (Eddie Redmayne) cùng đồng đội thực hiện nhiệm vụ đầy hiểm nguy này. Trong tình thế ngàn cân treo sợi tóc như vậy, liệu thầy Dumbledore có thể đứng ngoài được bao lâu?', N'Mỹ', CAST(N'2022-04-08' AS Date), 2022, N'David Yates', 143, 16, N'https://www.cgv.vn/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/p/o/poster_fantastic_beasts_the_secrets_of_dumbledore_1_.jpg', 1)
SET IDENTITY_INSERT [dbo].[PHIM] OFF
GO
INSERT [dbo].[PHONG] ([MaPhong], [TrangThai], [TongSoGhe]) VALUES (N'P01', 1, 48)
INSERT [dbo].[PHONG] ([MaPhong], [TrangThai], [TongSoGhe]) VALUES (N'P02', 0, 48)
INSERT [dbo].[PHONG] ([MaPhong], [TrangThai], [TongSoGhe]) VALUES (N'P03', 0, 48)
INSERT [dbo].[PHONG] ([MaPhong], [TrangThai], [TongSoGhe]) VALUES (N'P04', 0, 48)
INSERT [dbo].[PHONG] ([MaPhong], [TrangThai], [TongSoGhe]) VALUES (N'P05', 0, 48)
INSERT [dbo].[PHONG] ([MaPhong], [TrangThai], [TongSoGhe]) VALUES (N'P06', 1, 48)
INSERT [dbo].[PHONG] ([MaPhong], [TrangThai], [TongSoGhe]) VALUES (N'P07', 0, 48)
GO
INSERT [dbo].[QUYEN] ([MaQuyen], [TenQuyen]) VALUES (N'KH', N'Khách Hàng')
INSERT [dbo].[QUYEN] ([MaQuyen], [TenQuyen]) VALUES (N'NV', N'Nhân Viên')
INSERT [dbo].[QUYEN] ([MaQuyen], [TenQuyen]) VALUES (N'QL', N'Quản Lý')
GO
INSERT [dbo].[TAIKHOAN] ([Email], [MaQuyen], [Password]) VALUES (N'duchau051113@gmail.com', N'KH', N'e10adc3949ba59abbe56e057f20f883e                  ')
INSERT [dbo].[TAIKHOAN] ([Email], [MaQuyen], [Password]) VALUES (N'kimoanh@gmail.com', N'NV', N'2e9ec317e197819358fbc43afca7d837                  ')
INSERT [dbo].[TAIKHOAN] ([Email], [MaQuyen], [Password]) VALUES (N'lethithuytrang20070805@gmail.com', N'KH', N'2e9ec317e197819358fbc43afca7d837                  ')
INSERT [dbo].[TAIKHOAN] ([Email], [MaQuyen], [Password]) VALUES (N'n19dccn053@student.ptithcm.edu.vn', N'NV', N'25d55ad283aa400af464c76d713c07ad                  ')
INSERT [dbo].[TAIKHOAN] ([Email], [MaQuyen], [Password]) VALUES (N'n19dccn154@student.ptithcm.edu.vn', N'KH', N'e10adc3949ba59abbe56e057f20f883e                  ')
INSERT [dbo].[TAIKHOAN] ([Email], [MaQuyen], [Password]) VALUES (N'n19dccn207@student.ptithcm.edu.vn', N'QL', N'25d55ad283aa400af464c76d713c07ad                  ')
INSERT [dbo].[TAIKHOAN] ([Email], [MaQuyen], [Password]) VALUES (N'test@gmail.com', N'KH', N'25d55ad283aa400af464c76d713c07ad                  ')
INSERT [dbo].[TAIKHOAN] ([Email], [MaQuyen], [Password]) VALUES (N'tranthikimoanh@gmail.com', N'KH', N'e10adc3949ba59abbe56e057f20f883e                  ')
INSERT [dbo].[TAIKHOAN] ([Email], [MaQuyen], [Password]) VALUES (N'trieuthiyenkhoa@gmail.com', N'KH', N'25d55ad283aa400af464c76d713c07ad                  ')
INSERT [dbo].[TAIKHOAN] ([Email], [MaQuyen], [Password]) VALUES (N'trieuthiyenkhoa0202@gmail.com', N'KH', N'827ccb0eea8a706c4c34a16891f84e7b                  ')
GO
INSERT [dbo].[THE_LOAI] ([MaTL], [TenTL]) VALUES (N'H', N'Hài sgsdaddsa')
INSERT [dbo].[THE_LOAI] ([MaTL], [TenTL]) VALUES (N'HD', N'Hành động ')
INSERT [dbo].[THE_LOAI] ([MaTL], [TenTL]) VALUES (N'HH', N'Hoạt Hình')
INSERT [dbo].[THE_LOAI] ([MaTL], [TenTL]) VALUES (N'KD', N'Kinh Dị')
INSERT [dbo].[THE_LOAI] ([MaTL], [TenTL]) VALUES (N'LM', N'Lãng Mạn')
INSERT [dbo].[THE_LOAI] ([MaTL], [TenTL]) VALUES (N'PL', N'Phiêu Lưu')
INSERT [dbo].[THE_LOAI] ([MaTL], [TenTL]) VALUES (N'PTL', N'Phim Tài Liệu')
INSERT [dbo].[THE_LOAI] ([MaTL], [TenTL]) VALUES (N'TC', N'Tình Cảm')
INSERT [dbo].[THE_LOAI] ([MaTL], [TenTL]) VALUES (N'TL', N'Tâm Lý')
INSERT [dbo].[THE_LOAI] ([MaTL], [TenTL]) VALUES (N'TT', N'Thần Thoại')
GO
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'H', 1)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'H', 4)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'H', 5)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'H', 8)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'H', 9)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'H', 12)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'H', 14)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'HD', 1)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'HD', 5)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'HD', 11)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'HD', 12)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'HD', 13)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'HH', 2)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'HH', 6)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'HH', 9)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'KD', 1)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'KD', 10)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'KD', 13)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'PL', 1)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'PL', 9)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'PL', 11)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'PL', 16)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'PTL', 15)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'TC', 4)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'TL', 3)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'TT', 6)
INSERT [dbo].[THE_LOAI_PHIM] ([MaTL], [MaPhim]) VALUES (N'TT', 16)
GO
SET IDENTITY_INSERT [dbo].[VE] ON 

INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (35, 2, 2, CAST(N'2022-06-07' AS Date), N'LV01', NULL, 8)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (35, 2, 3, CAST(N'2022-06-07' AS Date), N'LV01', NULL, 9)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (35, 2, 4, CAST(N'2022-06-07' AS Date), N'LV01', NULL, 10)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (35, 2, 6, CAST(N'2022-06-07' AS Date), N'LV01', NULL, 11)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (35, 2, 19, CAST(N'2022-06-07' AS Date), N'LV01', NULL, 12)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (35, 2, 21, CAST(N'2022-06-07' AS Date), N'LV01', NULL, 13)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (35, 2, 5, CAST(N'2022-06-07' AS Date), N'LV01', NULL, 18)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (35, NULL, 13, CAST(N'2022-06-07' AS Date), N'LV01', 1, 19)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (37, 2, 3, CAST(N'2022-06-11' AS Date), N'LV02', NULL, 20)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (37, 7, 4, CAST(N'2022-06-11' AS Date), N'LV02', NULL, 21)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (37, 7, 5, CAST(N'2022-06-11' AS Date), N'LV02', NULL, 22)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (37, NULL, 1, CAST(N'2022-06-11' AS Date), N'LV02', 1, 23)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (4, 1, 1, CAST(N'2022-06-22' AS Date), N'LV02', NULL, 25)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (38, 8, 4, CAST(N'2022-06-11' AS Date), N'LV02', NULL, 26)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (38, 8, 5, CAST(N'2022-06-11' AS Date), N'LV02', NULL, 27)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (37, NULL, 6, CAST(N'2022-06-11' AS Date), N'LV02', 1, 28)
INSERT [dbo].[VE] ([MaSuatChieu], [MaKH], [SoGhe], [NgayBan], [MaLV], [MaNV], [MaVe]) VALUES (37, NULL, 12, CAST(N'2022-06-11' AS Date), N'LV02', 1, 29)
SET IDENTITY_INSERT [dbo].[VE] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Khach_Hang]    Script Date: 7/7/2023 1:04:52 PM ******/
ALTER TABLE [dbo].[KHACH_HANG] ADD  CONSTRAINT [IX_Khach_Hang] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uc_n_p_g]    Script Date: 7/7/2023 1:04:52 PM ******/
ALTER TABLE [dbo].[LICH_CHIEU] ADD  CONSTRAINT [uc_n_p_g] UNIQUE NONCLUSTERED 
(
	[NgayChieu] ASC,
	[MaPhong] ASC,
	[GioChieu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_NHAN_VIEN]    Script Date: 7/7/2023 1:04:52 PM ******/
ALTER TABLE [dbo].[NHAN_VIEN] ADD  CONSTRAINT [IX_NHAN_VIEN] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[KHACH_HANG]  WITH CHECK ADD  CONSTRAINT [FK_KHACH_HANG_TAIKHOAN] FOREIGN KEY([Email])
REFERENCES [dbo].[TAIKHOAN] ([Email])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[KHACH_HANG] CHECK CONSTRAINT [FK_KHACH_HANG_TAIKHOAN]
GO
ALTER TABLE [dbo].[LICH_CHIEU]  WITH CHECK ADD FOREIGN KEY([MaPhim])
REFERENCES [dbo].[PHIM] ([MaPhim])
GO
ALTER TABLE [dbo].[LICH_CHIEU]  WITH CHECK ADD  CONSTRAINT [FK_LICH_CHIEU_Phong] FOREIGN KEY([MaPhong])
REFERENCES [dbo].[PHONG] ([MaPhong])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[LICH_CHIEU] CHECK CONSTRAINT [FK_LICH_CHIEU_Phong]
GO
ALTER TABLE [dbo].[NHAN_VIEN]  WITH CHECK ADD  CONSTRAINT [FK_NHAN_VIEN_TAIKHOAN] FOREIGN KEY([Email])
REFERENCES [dbo].[TAIKHOAN] ([Email])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[NHAN_VIEN] CHECK CONSTRAINT [FK_NHAN_VIEN_TAIKHOAN]
GO
ALTER TABLE [dbo].[TAIKHOAN]  WITH CHECK ADD  CONSTRAINT [FK_TAIKHOAN_Quyen] FOREIGN KEY([MaQuyen])
REFERENCES [dbo].[QUYEN] ([MaQuyen])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[TAIKHOAN] CHECK CONSTRAINT [FK_TAIKHOAN_Quyen]
GO
ALTER TABLE [dbo].[THE_LOAI_PHIM]  WITH CHECK ADD  CONSTRAINT [FK__THE_LOAI___MaPhi__1BC821DD] FOREIGN KEY([MaPhim])
REFERENCES [dbo].[PHIM] ([MaPhim])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[THE_LOAI_PHIM] CHECK CONSTRAINT [FK__THE_LOAI___MaPhi__1BC821DD]
GO
ALTER TABLE [dbo].[THE_LOAI_PHIM]  WITH CHECK ADD  CONSTRAINT [FK__THE_LOAI_P__MaTL__1AD3FDA4] FOREIGN KEY([MaTL])
REFERENCES [dbo].[THE_LOAI] ([MaTL])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[THE_LOAI_PHIM] CHECK CONSTRAINT [FK__THE_LOAI_P__MaTL__1AD3FDA4]
GO
ALTER TABLE [dbo].[VE]  WITH CHECK ADD FOREIGN KEY([MaKH])
REFERENCES [dbo].[KHACH_HANG] ([MaKH])
GO
ALTER TABLE [dbo].[VE]  WITH CHECK ADD  CONSTRAINT [FK__VE__MaNV__0E6E26BF] FOREIGN KEY([MaNV])
REFERENCES [dbo].[NHAN_VIEN] ([MaNV])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[VE] CHECK CONSTRAINT [FK__VE__MaNV__0E6E26BF]
GO
ALTER TABLE [dbo].[VE]  WITH CHECK ADD  CONSTRAINT [FK__VE__MaSuatChieu__0F624AF8] FOREIGN KEY([MaSuatChieu])
REFERENCES [dbo].[LICH_CHIEU] ([MaSuatChieu])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[VE] CHECK CONSTRAINT [FK__VE__MaSuatChieu__0F624AF8]
GO
ALTER TABLE [dbo].[VE]  WITH CHECK ADD  CONSTRAINT [FK_VE_LOAIVE] FOREIGN KEY([MaLV])
REFERENCES [dbo].[LOAIVE] ([MaLV])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[VE] CHECK CONSTRAINT [FK_VE_LOAIVE]
GO
USE [master]
GO
ALTER DATABASE [QLRCP] SET  READ_WRITE 
GO
