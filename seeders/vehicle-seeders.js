"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    
    tabel cars : {
    car_id,
    vehicle_id,
    type,
    features,
    transmission_type,
    fuel_type,
    passenger_capacity,
    baggage_capacity
    }
    
    */

    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        "Vehicles",
        [
          {
            vehicle_id: "172e309e-b9c7-4da1-8292-ae1af14c1a17",
            vehicle_type: "Car",
            name: "Toyota Avanza",
            brand: "Toyota",
            license_plate: "DD 0001 MPV",
            manufacture_year: 2023,
            color: "Silver",
            image_url: "Vehicle-1751879013821_liBvSQUgx.png",
            details:
              'Jelajahi berbagai destinasi bersama Toyota Avanza, mobil MPV yang telah menjadi andalan keluarga Indonesia. Dikenal dengan julukan "mobil sejuta umat," Avanza menawarkan kabin yang luas dengan kapasitas hingga 7 penumpang, menjadikannya pilihan ideal untuk liburan keluarga, perjalanan luar kota, atau sekadar berkeliling dengan nyaman. Dengan mesin yang efisien dan bandel, Avanza siap menemani petualangan Anda tanpa harus khawatir soal bahan bakar.',
            condition_description:
              "Setiap kendaraan secara rutin menjalani servis berkala di bengkel resmi untuk memastikan performa mesin, sistem pengereman, dan kaki-kaki selalu optimal. Interior mobil dijamin bersih, wangi, dan bebas dari asap rokok. Sistem pendingin (AC) double blower yang dingin hingga ke baris belakang akan memastikan kenyamanan seluruh penumpang selama perjalanan.",
            price_per_day: 350000,
            created_at: "2025-07-07 17:03:38.772+08",
            updated_at: "2025-07-07 17:03:38.772+08",
          },
          {
            vehicle_id: "00788f53-5766-41af-9238-d00fd235f703",
            vehicle_type: "Car",
            name: "Honda Accord",
            brand: "Honda",
            license_plate: "DD 0002 SDN",
            manufacture_year: 2022,
            color: "Putih",
            image_url: "Vehicle-1751878522471_0R4A65HN-.png",
            details:
              "Tingkatkan pengalaman berkendara Anda dengan Honda Accord. Sedan premium ini menawarkan perpaduan sempurna antara kemewahan, teknologi canggih, dan performa yang responsif. Dengan desain eksterior yang elegan dan interior mewah yang dilengkapi material berkualitas tinggi, Accord memberikan kenyamanan maksimal bagi pengemudi maupun penumpang. Sangat pas untuk perjalanan bisnis, acara spesial, atau bagi Anda yang menginginkan pengalaman berkendara yang lebih berkelas.",
            condition_description:
              "Sedan premium ini menawarkan perpaduan sempurna antara kemewahan, teknologi canggih, dan performa yang responsif. Dengan desain eksterior yang elegan dan interior mewah yang dilengkapi material berkualitas tinggi, Accord memberikan kenyamanan maksimal bagi pengemudi maupun penumpang. Sangat pas untuk perjalanan bisnis, acara spesial, atau bagi Anda yang menginginkan pengalaman berkendara yang lebih berkelas.",
            price_per_day: 400000,
            created_at: "2025-07-07 16:55:25.615+08",
            updated_at: "2025-07-07 16:55:25.615+08",
          },
          {
            vehicle_id: "00fdbbd4-91f6-48d4-9809-aa713bce6e44",
            vehicle_type: "Car",
            name: "Mitsubishi Pajero",
            brand: "Mitsubishi",
            license_plate: "DD 0002 SUV",
            manufacture_year: 2021,
            color: "Hitam",
            image_url: "Vehicle-1751874910322_qNRXWM6WB.png",
            details:
              "Hadapi setiap tantangan di jalan dengan Mitsubishi Pajero Sport. SUV tangguh ini dirancang untuk memberikan performa superior baik di jalanan perkotaan maupun di medan yang lebih menantang. Dengan postur yang gagah, mesin diesel bertenaga, dan ground clearance tinggi, Pajero Sport menawarkan rasa aman dan percaya diri saat berkendara. ",
            condition_description:
              "Mesinnya yang terkenal irit selalu kami servis rutin untuk menjaga efisiensinya. Kebersihan interior, kesejukan AC, dan fungsionalitas fitur hiburan selalu menjadi prioritas kami agar perjalanan keluarga Anda berjalan lancar dan nyaman.  ",
            price_per_day: 620000,
            created_at: "2025-07-07 15:55:13.757+08",
            updated_at: "2025-07-07 15:55:13.757+08",
          },
          {
            vehicle_id: "d836c337-beb3-44af-bbb9-9550bdcd4287",
            vehicle_type: "Car",
            name: "Wuling Confero S 1.5L",
            brand: "Wuling",
            license_plate: "DD 0002 WL",
            manufacture_year: 2023,
            color: "Silver",
            image_url: "Vehicle-1753522326911_3_qZbHDEO.png",
            details:
              "Wuling Confero S adalah MPV 7-penumpang yang menawarkan kabin luas dan fitur lengkap dengan harga terjangkau. Ditenagai mesin 1.5L bertenaga, mobil ini dilengkapi AC double blower, sistem hiburan layar sentuh, sensor parkir, serta konfigurasi kursi fleksibel. Ideal untuk penggunaan keluarga atau perjalanan antar kota.",
            condition_description:
              "Mobil dalam kondisi sangat baik. Mesin responsif, interior bersih dan kabin luas. AC dingin, ban baru, serta rem dalam kondisi optimal. Terdapat baret kecil di sisi bumper belakang, namun tidak memengaruhi performa atau kenyamanan.",
            price_per_day: 275000,
            created_at: "2025-07-26 17:32:13.435+08",
            updated_at: "2025-07-26 17:32:13.435+08",
          },
          {
            vehicle_id: "2e44cfc7-fed4-47ba-929c-91144c5ed6cb",
            vehicle_type: "Car",
            name: "Suzuki Ertiga",
            brand: "Suzuki",
            license_plate: "DD 0002 MPV",
            manufacture_year: 2022,
            color: "Putih",
            image_url: "Vehicle-1751880467823_0KWZlSlbS.png",
            details:
              "Suzuki Ertiga adalah pilihan cerdas untuk keluarga modern. MPV ini menawarkan kabin yang lega dan nyaman untuk 7 penumpang dengan sentuhan interior yang terasa lebih mewah di kelasnya. Keunggulan utama Ertiga terletak pada konsumsi bahan bakarnya yang sangat irit, menjadikannya pilihan ekonomis untuk perjalanan jarak jauh maupun aktivitas harian. Berkendara menjadi lebih menyenangkan tanpa harus sering mampir ke pom bensin.",
            condition_description:
              "Semua fitur canggihnya, mulai dari layar sentuh hingga sistem keselamatan, dipastikan berfungsi 100%. Kendaraan selalu bersih, terawat, dan siap memberikan pengalaman berkendara yang menyenangkan dan berbeda dari yang lain.",
            price_per_day: 500000,
            created_at: "2025-07-07 17:27:51.071+08",
            updated_at: "2025-07-07 17:27:51.071+08",
          },
          {
            vehicle_id: "f53de240-a17d-4412-948f-e5838af2473e",
            vehicle_type: "Car",
            name: "Hyundai Creta",
            brand: "Hyundai",
            license_plate: "DD 0004 SUV",
            manufacture_year: 2025,
            color: "Putih",
            image_url: "Vehicle-1751880004748_a9tZjb9wL.png",
            details:
              "Tampil beda di jalanan dengan Hyundai Creta, SUV crossover yang futuristik dan penuh gaya. Creta tidak hanya menarik perhatian dengan desainnya yang unik, tetapi juga memanjakan Anda dengan berbagai fitur teknologi canggih, termasuk panoramic sunroof dan sistem infotainment terdepan. Ukurannya yang ringkas membuatnya lincah di perkotaan, namun tetap tangguh untuk diajak berpetualang.",
            condition_description:
              "Kami memastikan mesin selalu dalam performa puncak, AC dingin, dan kabin yang bersih serta nyaman. Mobil ini adalah jaminan keandalan, siap mengantar Anda ke berbagai tujuan tanpa kendala.",
            price_per_day: 600000,
            created_at: "2025-07-07 17:20:07.894+08",
            updated_at: "2025-07-07 17:20:07.894+08",
          },
          {
            vehicle_id: "89625172-09de-4725-8d96-a0124f1c5eb7",
            vehicle_type: "Car",
            name: "Honda Vios",
            brand: "Honda",
            license_plate: "DD 0001 SDN",
            manufacture_year: 2022,
            color: "Hitam",
            image_url: "Vehicle-1751874823957_NO3HkSoqpG.png",
            details:
              "Honda Vios (atau Toyota Vios) adalah jawaban bagi Anda yang mencari sedan kompak yang andal dan efisien. Dikenal dengan durabilitas mesinnya yang luar biasa dan konsumsi bahan bakar yang sangat irit, Vios menjadi pilihan favorit untuk mobilitas tinggi di perkotaan. Handling yang lincah dan ukuran yang pas membuatnya mudah untuk bermanuver di jalanan yang padat dan saat parkir.",
            condition_description:
              "Suspensi yang menjadi keunggulannya selalu kami periksa untuk menjamin kenyamanan maksimal. Kebersihan kabin hingga ke detail terkecil dan performa mesin yang responsif adalah standar kami untuk setiap unit yang disewakan.",
            price_per_day: 350000,
            created_at: "2025-07-07 15:53:48.073+08",
            updated_at: "2025-07-07 15:53:48.073+08",
          },
          {
            vehicle_id: "f45bc4c8-3cb6-425c-b46a-3d94fa314470",
            vehicle_type: "Car",
            name: "Mitsubishi Xpander",
            brand: "Mitsubishi",
            license_plate: "DD 0003 SUV",
            manufacture_year: 2022,
            color: "Putih",
            image_url: "Vehicle-1751879146138_PYvqiSit-.png",
            details:
              "Mitsubishi Xpander hadir dengan desain revolusioner yang menggabungkan kenyamanan sebuah MPV dengan tampilan tangguh layaknya SUV. Nikmati kabin yang senyap, suspensi yang nyaman, dan ruang yang sangat lega untuk 7 penumpang. Ground clearance yang tinggi memberikan rasa percaya diri lebih saat melewati jalanan yang kurang rata. Xpander adalah paket lengkap untuk keluarga yang aktif dan dinamis.",
            condition_description:
              "Dengan desain yang tajam, interior berkualitas, dan fitur-fitur yang biasanya ditemukan pada mobil kelas atas, City adalah pilihan tepat bagi Anda yang berjiwa muda dan dinamis. Performa mesinnya yang responsif dan efisien menjadikan setiap perjalanan di dalam kota terasa lebih menyenangkan.",
            price_per_day: 450000,
            created_at: "2025-07-07 17:05:48.676+08",
            updated_at: "2025-07-07 17:05:48.676+08",
          },
          {
            vehicle_id: "74ff9ae8-aa20-4c4f-a192-0867583ecd82",
            vehicle_type: "Car",
            name: "Honda Mobilio",
            brand: "Honda",
            license_plate: "DD 1111 MP",
            manufacture_year: 2023,
            color: "Silver",
            image_url: "Vehicle-1753447815321_n_MtAlaM7.png",
            details:
              "Honda Mobilio hadir sebagai MPV 7-penumpang dengan desain stylish dan kabin lapang. Ditenagai mesin 1.5L i-VTEC yang efisien dan responsif, Mobilio dilengkapi transmisi CVT, AC double blower, sistem audio touchscreen, serta fitur keselamatan seperti ABS dan dual airbag. Cocok untuk keperluan keluarga maupun perjalanan wisata.",
            condition_description:
              "Mobil dalam kondisi sangat baik, mesin halus dan responsif. Interior bersih dan terawat, AC dingin dan berfungsi normal. Ban dalam kondisi baru, rem cakram depan-belakang optimal. Terdapat gores halus di pintu kiri belakang namun tidak memengaruhi fungsi maupun estetika kendaraan.",
            price_per_day: 350000,
            created_at: "2025-07-25 20:50:21.841+08",
            updated_at: "2025-07-25 20:50:21.841+08",
          },
          {
            vehicle_id: "05fce81c-7603-45df-845b-9fc42a16b5c6",
            vehicle_type: "Car",
            name: "Honda Mobilio",
            brand: "Honda",
            license_plate: "DD 111 MP",
            manufacture_year: 2023,
            color: "Silver",
            image_url: "Vehicle-1753446550553_5NHafUPXx.png",
            details:
              "Honda Mobilio hadir sebagai MPV 7-penumpang dengan desain stylish dan kabin lapang. Ditenagai mesin 1.5L i-VTEC yang efisien dan responsif, Mobilio dilengkapi transmisi CVT, AC double blower, sistem audio touchscreen, serta fitur keselamatan seperti ABS dan dual airbag. Cocok untuk keperluan keluarga maupun perjalanan wisata.",
            condition_description:
              "Jelaskan kondisi aktual kendaraan ini secara spesifik. Sebutkan kelebihan utamanya (misal: sangat irit, AC dingin sekali, ban baru) dan jika ada, catatan atau kekurangan minor yang perlu diketahui penyewa (misal: goresan halus di bumper belakang).",
            price_per_day: 350000,
            created_at: "2025-07-25 20:29:24.006+08",
            updated_at: "2025-07-25 20:29:24.006+08",
          },
          {
            vehicle_id: "055ee1ef-b517-4810-bb56-1140d0eb49ea",
            vehicle_type: "Car",
            name: "Honda City",
            brand: "Honda",
            license_plate: "DD 0003 SDN",
            manufacture_year: 2023,
            color: "Putih",
            image_url: "Vehicle-1751879821787_22L-J2fWF.png",
            details:
              "Honda City menawarkan pengalaman berkendara sedan yang sporty dan elegan. Dengan desain yang tajam, interior berkualitas, dan fitur-fitur yang biasanya ditemukan pada mobil kelas atas, City adalah pilihan tepat bagi Anda yang berjiwa muda dan dinamis. Performa mesinnya yang responsif dan efisien menjadikan setiap perjalanan di dalam kota terasa lebih menyenangkan.",
            condition_description:
              "Tampilan eksterior yang mengkilap, interior yang bersih dan mewah, serta semua fitur seperti paddle shift (pada tipe tertentu) dan sistem audio berfungsi dengan baik. Mobil ini siap mendukung gaya hidup Anda yang aktif dan modern.",
            price_per_day: 500000,
            created_at: "2025-07-07 17:17:05.033+08",
            updated_at: "2025-07-07 17:17:05.033+08",
          },
          {
            vehicle_id: "8a395d2f-5483-4689-80f9-2743f156b341",
            vehicle_type: "Car",
            name: "Honda HRV",
            brand: "Honda",
            license_plate: "DD 0005 SUV",
            manufacture_year: 2025,
            color: "Putih",
            image_url: "Vehicle-1751880210878_tw4DF54sb.png",
            details:
              "Honda HR-V adalah perpaduan ideal antara gaya sebuah coupe dengan fungsionalitas sebuah SUV. Desainnya yang aerodinamis dan modern membuatnya menonjol di keramaian kota. Dengan posisi mengemudi yang tinggi, Anda mendapatkan visibilitas yang lebih baik, sementara interiornya yang fleksibel memberikan ruang yang cukup untuk penumpang dan barang bawaan.",
            condition_description:
              "Setiap unit Honda HR-V kami terawat dengan cermat. Dari mesin i-VTEC yang efisien hingga fitur-fitur modern di dalamnya, semua kami pastikan dalam kondisi optimal. Kebersihan dan kenyamanan kabin adalah prioritas utama kami untuk memastikan pengalaman berkendara Anda yang premium dan menyenangkan.",
            price_per_day: 600000,
            created_at: "2025-07-07 17:23:33.293+08",
            updated_at: "2025-07-07 17:23:33.293+08",
          },
          {
            vehicle_id: "a59b59ac-8f61-4c2a-a466-4d696e93a4f4",
            vehicle_type: "Car",
            name: "Toyota Fortuner",
            brand: "Toyota",
            license_plate: "DD 0001 SUV",
            manufacture_year: 2023,
            color: "Hitam",
            image_url: "Vehicle-1751874555836_JN3JFUzeN.png",
            details:
              "Toyota Fortuner adalah simbol dari kekuatan, kemewahan, dan keandalan. SUV premium ini siap membawa Anda mendominasi setiap perjalanan, baik di jalan raya maupun di medan yang lebih berat. Dengan mesin diesel yang bertenaga, desain yang gagah, serta interior mewah berkapasitas 7 penumpang, Fortuner menawarkan pengalaman berkendara yang superior dan penuh percaya diri.",
            condition_description:
              "Performa mesin, sistem pengereman, dan kaki-kaki kokohnya selalu menjadi fokus utama dalam perawatan rutin kami. Interiornya yang mewah kami jamin selalu bersih, rapi, dan siap memberikan kenyamanan kelas atas bagi Anda dan rekan perjalanan Anda.",
            price_per_day: 500000,
            created_at: "2025-07-07 15:49:19.18+08",
            updated_at: "2025-07-07 15:49:19.18+08",
          },
          {
            vehicle_id: "535e25b0-9b38-471a-8cf2-de417228c251",
            vehicle_type: "Motorcycle",
            name: "Honda Vario",
            brand: "Honda",
            license_plate: "DD 0009 VR",
            manufacture_year: 2023,
            color: "Hitam",
            image_url: "Vehicle-1753523683753_V47vEGH3Y.png",
            details:
              "Honda Vario 160 hadir dengan desain futuristik dan mesin bertenaga 160cc eSP+, dilengkapi dengan lampu LED, panel meter full digital, serta kapasitas bagasi luas. Motor ini sangat cocok untuk penggunaan harian maupun perjalanan wisata, memberikan kenyamanan dan efisiensi bahan bakar yang luar biasa.",
            condition_description:
              "Jelaskan kondisi aktual kendaraan ini secara spesifik. Sebutkan kelebihan utamanya (misal: sangat irit, AC dingin sekali, ban baru) dan jika ada, catatan atau kekurangan minor yang perlu diketahui penyewa (misal: goresan halus di bumper belakang).",
            price_per_day: 90000,
            created_at: "2025-07-26 17:54:49.071+08",
            updated_at: "2025-07-26 17:54:49.071+08",
          },
          {
            vehicle_id: "92755b5e-64bf-4954-bae7-db0057646542",
            vehicle_type: "Motorcycle",
            name: "Honda Scoopy",
            brand: "Honda",
            license_plate: "DD 0001 HS",
            manufacture_year: 2024,
            color: "Cream Brown",
            image_url: "Vehicle-1753523792577_w-hBDgUzF.png",
            details:
              "Honda Scoopy menawarkan desain retro-modern yang stylish dengan mesin 110cc eSP yang irit dan andal. Dilengkapi dengan lampu LED, panel meter digital analog, serta fitur idling stop system dan answer back system. Cocok untuk penggunaan harian di perkotaan maupun perjalanan santai.",
            condition_description:
              "Jelaskan kondisi aktual kendaraan ini secara spesifik. Sebutkan kelebihan utamanya (misal: sangat irit, AC dingin sekali, ban baru) dan jika ada, catatan atau kekurangan minor yang perlu diketahui penyewa (misal: goresan halus di bumper belakang).",
            price_per_day: 80000,
            created_at: "2025-07-26 17:56:36.889+08",
            updated_at: "2025-07-26 17:56:36.889+08",
          },
          {
            vehicle_id: "af4c9fd4-3d88-4be5-bcd6-644ad85d62a9",
            vehicle_type: "Motorcycle",
            name: "Honda Vario",
            brand: "Honda",
            license_plate: "DD 0002 VR",
            manufacture_year: 2023,
            color: "Hitam",
            image_url: "Vehicle-1753523092023_dYwyFjc7M.png",
            details:
              "Honda Vario 160 hadir dengan desain futuristik dan mesin bertenaga 160cc eSP+, dilengkapi dengan lampu LED, panel meter full digital, serta kapasitas bagasi luas. Motor ini sangat cocok untuk penggunaan harian maupun perjalanan wisata, memberikan kenyamanan dan efisiensi bahan bakar yang luar biasa.",
            condition_description:
              "Jelaskan kondisi aktual kendaraan ini secara spesifik. Sebutkan kelebihan utamanya (misal: sangat irit, AC dingin sekali, ban baru) dan jika ada, catatan atau kekurangan minor yang perlu diketahui penyewa (misal: goresan halus di bumper belakang).",
            price_per_day: 90000,
            created_at: "2025-07-26 17:44:55.982+08",
            updated_at: "2025-07-26 17:44:55.982+08",
          },
          {
            vehicle_id: "fd65567f-ab4b-4242-8a65-405e1d5e4b6a",
            vehicle_type: "Motorcycle",
            name: "Yamaha NMAX",
            brand: "Yamaha",
            license_plate: "DD 1111 MC",
            manufacture_year: 2024,
            color: "Hitam",
            image_url: "Vehicle-1752310352044_sMYBguzjT.png",
            details: "Kualitas terbaik dari Yamaha.",
            condition_description:
              "Jelaskan kondisi aktual kendaraan ini secara spesifik. Sebutkan kelebihan utamanya (misal: sangat irit, AC dingin sekali, ban baru) dan jika ada, catatan atau kekurangan minor yang perlu diketahui penyewa (misal: goresan halus di bumper belakang).",
            price_per_day: 350000,
            created_at: "2025-07-12 16:52:43.911+08",
            updated_at: "2025-07-12 16:52:43.911+08",
          },
        ],
        { transaction }
      );
      await queryInterface.bulkInsert(
        "Cars",
        [
          {
            car_id: "30a2c0da-b51b-43a9-8c44-3b3bc12f234e",
            vehicle_id: "172e309e-b9c7-4da1-8292-ae1af14c1a17",
            type: "MPV",
            features: ["Sensor Parkir", "Head Unit Touchscreen", "Kartu Tol"],
            passenger_capacity: 6,
            baggage_capacity: 2,
            transmission_type: "Manual",
            fuel_type: "Pertamax",
            created_at: "2025-07-07 17:03:38.787+08",
            updated_at: "2025-07-12 15:44:56.954+08",
          },
          {
            car_id: "36fbd495-7ea1-4fda-8826-8cca5a06d8c8",
            vehicle_id: "00788f53-5766-41af-9238-d00fd235f703",
            type: "Sedan",
            features: [
              "Sensor Parkir",
              "Head Unit Touchscreen",
              "Kartu Tol",
              "Spion Otomatis",
            ],
            passenger_capacity: 5,
            baggage_capacity: 1,
            transmission_type: "Manual",
            fuel_type: "Pertamax",
            created_at: "2025-07-07 16:55:25.636+08",
            updated_at: "2025-07-13 16:17:49.572+08",
          },
          {
            car_id: "4c1574ad-577e-4a14-adb0-e56322814553",
            vehicle_id: "00fdbbd4-91f6-48d4-9809-aa713bce6e44",
            type: "SUV",
            features: [
              "Sensor Parkir",
              "Head Unit Touchscreen",
              "Kartu Tol",
              "Atap Terbuka",
            ],
            passenger_capacity: 7,
            baggage_capacity: 2,
            transmission_type: "Manual",
            fuel_type: "Pertamax",
            created_at: "2025-07-07 15:55:13.76+08",
            updated_at: "2025-07-27 12:37:38.451+08",
          },
          {
            car_id: "50be4a1a-a7f8-4f59-8be4-83d60f40195a",
            vehicle_id: "d836c337-beb3-44af-bbb9-9550bdcd4287",
            type: "MPV",
            features: ["Sensor Parkir"],
            passenger_capacity: 6,
            baggage_capacity: 2,
            transmission_type: "Manual",
            fuel_type: "Pertamax",
            created_at: "2025-07-26 17:32:13.439+08",
            updated_at: "2025-07-26 17:32:13.439+08",
          },
          {
            car_id: "5401dbb1-b3e4-4503-af80-a5e05b8c52a3",
            vehicle_id: "2e44cfc7-fed4-47ba-929c-91144c5ed6cb",
            type: "MPV",
            features: ["Sensor Parkir", "Head Unit Touchscreen", "Kartu Tol"],
            passenger_capacity: 6,
            baggage_capacity: 2,
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-07 17:27:51.074+08",
            updated_at: "2025-07-12 20:10:46.646+08",
          },
          {
            car_id: "56f457e9-7667-4ecb-94ef-44a1bad807d3",
            vehicle_id: "f53de240-a17d-4412-948f-e5838af2473e",
            type: "SUV",
            features: ["Sensor Parkir", "Head Unit Touchscreen", "Kartu Tol"],
            passenger_capacity: 7,
            baggage_capacity: 2,
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-07 17:20:07.897+08",
            updated_at: "2025-07-23 20:41:39.525+08",
          },
          {
            car_id: "6065e533-20ea-463d-a234-16ae83bba36f",
            vehicle_id: "89625172-09de-4725-8d96-a0124f1c5eb7",
            type: "Sedan",
            features: ["Sensor Parkir", "Head Unit Touchscreen", "Kartu Tol"],
            passenger_capacity: 5,
            baggage_capacity: 2,
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-07 15:53:48.088+08",
            updated_at: "2025-07-28 20:14:45.379+08",
          },
          {
            car_id: "6620cbda-67b3-44e9-908d-2ae370dcd1f3",
            vehicle_id: "f45bc4c8-3cb6-425c-b46a-3d94fa314470",
            type: "SUV",
            features: ["Sensor Parkir", "Head Unit Touchscreen", "Kartu Tol"],
            passenger_capacity: 7,
            baggage_capacity: 2,
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-07 17:05:48.679+08",
            updated_at: "2025-07-27 12:38:34.977+08",
          },
          {
            car_id: "a2b51dca-2079-4da3-9cac-9c71275af501",
            vehicle_id: "74ff9ae8-aa20-4c4f-a192-0867583ecd82",
            type: "MPV",
            features: ["Sensor Parkir"],
            passenger_capacity: 5,
            baggage_capacity: 2,
            transmission_type: "Manual",
            fuel_type: "Pertamax",
            created_at: "2025-07-25 20:50:21.846+08",
            updated_at: "2025-07-25 20:50:21.846+08",
          },
          {
            car_id: "abaff3a9-0848-4dcb-a96e-b92552535a09",
            vehicle_id: "05fce81c-7603-45df-845b-9fc42a16b5c6",
            type: "MPV",
            features: ["Sensor Parkir"],
            passenger_capacity: 5,
            baggage_capacity: 2,
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-25 20:29:24.028+08",
            updated_at: "2025-07-25 20:29:24.028+08",
          },
          {
            car_id: "c42bdb17-427a-480e-ad67-318a2ad37287",
            vehicle_id: "055ee1ef-b517-4810-bb56-1140d0eb49ea",
            type: "Sedan",
            features: ["Sensor Parkir", "Head Unit Touchscreen", "Kartu Tol"],
            passenger_capacity: 4,
            baggage_capacity: 2,
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-07 17:17:05.044+08",
            updated_at: "2025-07-27 12:39:23.716+08",
          },
          {
            car_id: "e90a20e9-997a-4806-85e7-f6af0d5037bb",
            vehicle_id: "8a395d2f-5483-4689-80f9-2743f156b341",
            type: "SUV",
            features: ["Sensor Parkir", "Head Unit Touchscreen", "Kartu Tol"],
            passenger_capacity: 7,
            baggage_capacity: 2,
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-07 17:23:33.295+08",
            updated_at: "2025-07-09 00:32:41.901+08",
          },
          {
            car_id: "ee89965f-fc52-4116-a6fd-0c6f2a1e297e",
            vehicle_id: "a59b59ac-8f61-4c2a-a466-4d696e93a4f4",
            type: "SUV",
            features: ["Sensor Parkir", "Head Unit Touchscreen", "Kartu Tol"],
            passenger_capacity: 8,
            baggage_capacity: 2,
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-07 15:49:19.21+08",
            updated_at: "2025-07-28 11:58:51.06+08",
          },
        ],
        { transaction }
      );
      await queryInterface.bulkInsert(
        "Motorcycles",
        [
          {
            motorcycle_id: "17c6e710-25bc-4c4d-8a87-cea8ca2740e9",
            vehicle_id: "535e25b0-9b38-471a-8cf2-de417228c251",
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-26 17:54:49.086+08",
            updated_at: "2025-07-26 17:54:49.086+08",
          },
          {
            motorcycle_id: "3c65371b-2c44-4810-8be4-073682d781ed",
            vehicle_id: "92755b5e-64bf-4954-bae7-db0057646542",
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-26 17:56:36.898+08",
            updated_at: "2025-07-26 17:56:36.898+08",
          },
          {
            motorcycle_id: "6ba1ddc6-3621-419b-8a1f-7931ce086144",
            vehicle_id: "af4c9fd4-3d88-4be5-bcd6-644ad85d62a9",
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-26 17:44:56.003+08",
            updated_at: "2025-07-26 17:44:56.003+08",
          },
          {
            motorcycle_id: "95676668-33e5-4178-a3ab-4b42442f0e7a",
            vehicle_id: "fd65567f-ab4b-4242-8a65-405e1d5e4b6a",
            transmission_type: "Automatic",
            fuel_type: "Pertamax",
            created_at: "2025-07-12 16:52:43.932+08",
            updated_at: "2025-07-12 16:52:43.932+08",
          },
        ],
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
