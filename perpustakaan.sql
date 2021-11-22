-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Nov 2021 pada 17.29
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpustakaan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `buku`
--

CREATE TABLE `buku` (
  `kode_buku` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `judul_buku` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tahun_terbit` date NOT NULL,
  `penulis` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stok` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `buku`
--

INSERT INTO `buku` (`kode_buku`, `judul_buku`, `tahun_terbit`, `penulis`, `stok`, `created_at`, `updated_at`) VALUES
('B9736', 'The Memoirs of Sherlock Holmes', '2020-01-14', 'Arthur Conan Doyle', 11, '2021-11-11 03:55:00', '2021-11-14 11:13:13'),
('C4147', 'Penance', '2017-04-11', 'Kanae Minato', 7, '2021-11-11 07:19:28', '2021-11-14 15:21:43'),
('E9925', 'The Masque of the Red Death', '2020-08-01', 'Edgar Allan Poe', 12, '2021-11-11 01:56:06', '2021-11-11 12:11:26'),
('H4938', 'Sacrifice', '2021-09-21', 'Jennifer Blackstream', 26, '2021-11-11 13:20:09', '2021-11-11 13:21:09'),
('M8346', 'The strange case of Dr. Jekyll and Mr. Hyde', '2021-01-08', 'Robert Louis Stevenson', 25, '2021-11-11 11:23:55', '2021-11-11 11:23:55'),
('N5343', '(Not) a Cold Marriage', '2021-07-28', 'Alfylla', 18, '2021-11-14 09:46:08', '2021-11-14 09:46:08'),
('P6989', 'The Raven', '2021-01-08', 'Edgar Allan Poe', 7, '2021-11-11 07:13:12', '2021-11-14 14:08:43'),
('W2575', 'The Forensic Geology Box Set', '2021-11-25', 'Tony Dwiggins', 16, '2021-11-11 11:55:44', '2021-11-11 11:55:44'),
('X5215', 'Death Comes to Pemberley', '2011-11-01', 'P. D. James', 9, '2021-11-11 07:29:49', '2021-11-12 07:26:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(7, '2021_11_11_083824_create_buku_table', 2),
(8, '2021_11_13_065625_create_peminjaman_buku_table', 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjaman_buku`
--

CREATE TABLE `peminjaman_buku` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_anggota` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_buku` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_peminjaman` date NOT NULL,
  `tgl_pengembalian` date NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `peminjaman_buku`
--

INSERT INTO `peminjaman_buku` (`id`, `id_anggota`, `id_buku`, `tgl_peminjaman`, `tgl_pengembalian`, `status`, `created_at`, `updated_at`) VALUES
(6, '2', 'B9736', '2021-11-14', '2021-11-16', 'diterima', '2021-11-14 08:39:59', '2021-11-14 09:40:22'),
(7, '2', 'N5343', '2021-11-14', '2021-11-18', 'ditolak', '2021-11-14 09:47:09', '2021-11-14 09:51:22'),
(8, '4', 'P6989', '2021-11-14', '2021-11-16', 'diterima', '2021-11-14 13:23:38', '2021-11-14 14:08:43'),
(9, '2', 'C4147', '2021-11-15', '2021-11-17', 'diterima', '2021-11-14 15:21:18', '2021-11-14 15:21:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `telepon`, `alamat`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@admin.com', '12345', 'Bekasi', NULL, '$2y$10$9i/TlWe5q6UJ1XXMKiVyjeWbx0thqFnCQfxpJZBbJG1gom8/ckR/2', 'admin', NULL, '2021-11-12 03:27:47', '2021-11-12 03:27:47'),
(2, 'Anggota 1', 'anggota1@gmail.com', '54326', 'Bekasi', NULL, '$2y$10$AfTSUI4piGD1dGf2gEpdseLLisQ/6MJ.w4AWemuBfQzhoyrty23/i', 'anggota', NULL, '2021-11-12 03:30:56', '2021-11-12 07:02:14'),
(4, 'Anggota 2', 'anggota2@gmail.com', '0813131312', 'Bandung', NULL, '$2y$10$VlmJZJW6pb35Oz6EfktZLeZ35Hf3YZyW5xc013.ymIy7uGmNoaHv2', 'anggota', NULL, '2021-11-12 07:13:42', '2021-11-14 06:47:37');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`kode_buku`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `peminjaman_buku`
--
ALTER TABLE `peminjaman_buku`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `peminjaman_buku`
--
ALTER TABLE `peminjaman_buku`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
