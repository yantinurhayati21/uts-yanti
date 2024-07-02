import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, BadgeInfo, Heart, MessageCircleMore } from "lucide-react";

let initialFilms = [
  {
    Id: 1,
    image: "https://o-cdn-cas.sirclocdn.com/parenting/images/The_Exorcist.width-800.format-webp.webp",
    name: "The Exorcist (1973)",
    year: 1973,
    genre: "horor",
    durasi: 3,
    sinopsis: "Bercerita tentang usaha seorang ibu untuk menyembuhkan putrinya yang kerasukan setan melalui eksorsisme (ritual pengusiran setan) yang dilakukan oleh dua orang pastur.",
    liked: false
  },
  {
    Id: 2,
    image: "https://akcdn.detik.net.id/community/media/visual/2023/08/03/scandal-makers-2023dokmd-pictures-present.jpeg?w=620&q=90",
    name: "Scandal Makers (2023)",
    year: 2023,
    genre: "komedi",
    durasi: 3,
    sinopsis: "Scandal Makers adalah film adaptasi dari Korea Selatan yang mengisahkan tentang Oskar, seorang penyiar radio terkenal yang hidupnya tiba-tiba berubah.",
    liked: false
  },
  {
    Id: 3,
    image: "https://upload.wikimedia.org/wikipedia/id/8/8a/Dark_Knight.jpg",
    name: "The Dark Knight (2008)",
    year: 2008,
    genre: "action",
    durasi: 3,
    sinopsis: "Film superhero yang mengikuti perjuangan Batman (Christian Bale) dalam menghadapi ancaman baru di Gotham City.",
    liked: false
  },
  {
    Id: 4,
    image: "https://m.media-amazon.com/images/M/MV5BMTM1MDM0NDUzOF5BMl5BanBnXkFtZTcwODUxMTg0NA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    name: "The Notebook (2004)",
    year: 2004,
    genre: "romance",
    durasi: 3,
    sinopsis: "Film ini menceritakan kisah cinta antara Noah Calhoun (Ryan Gosling) dan Allie Hamilton (Rachel McAdams), yang berasal dari latar belakang sosial yang berbeda.",
    liked: false
  }
];

const saveFilms = localStorage.getItem("daftarfilm");

function Film() {
  const [films, setFilms] = useState(saveFilms ? JSON.parse(saveFilms) : initialFilms);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newFilm, setNewFilm] = useState({
    Id: "",
    image: "",
    name: "",
    year: "",
    genre: "romance", // default genre
    durasi: "",
    sinopsis: ""
  });

  const handleInfo = (film) => {
    alert(
      `Judul: ${film.name}\nGenre: ${film.genre}\nDurasi: ${film.durasi}\nSinopsis: ${film.sinopsis}`
    );
  };

  const handleComment = (product) => {
    let comment = prompt(`Berikan komentar Anda tentang ${product.name}:`);
  
    // Validasi input
    while (comment && comment.trim() === "") {
      comment = prompt(`Komentar tidak boleh kosong. Berikan komentar Anda tentang ${product.name}:`);
    }
  
    if (comment) {
      alert(`Komentar Anda: ${comment}\nTerima kasih atas tanggapan Anda!`);
    } else {
      alert("Anda membatalkan komentar.");
    }
  };

  const handleShowForm = (film) => {
    if (film) {
      setNewFilm(film);
      setEditMode(true);
    } else {
      const newId = films.length ? films[films.length - 1].Id + 1 : 1;
      setNewFilm({ ...newFilm, Id: newId });
      setEditMode(false);
    }
    setShowForm(true);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (
      newFilm.name &&
      newFilm.year &&
      newFilm.genre &&
      newFilm.image &&
      newFilm.durasi &&
      newFilm.sinopsis
    ) {
      const newId = films.length ? films[films.length - 1].Id + 1 : 1;
      const updatedFilms = [...films, { ...newFilm, Id: newId }];
      setFilms(updatedFilms);
      localStorage.setItem("daftarfilm", JSON.stringify(updatedFilms));
      setShowForm(false);
      setNewFilm({
        Id: "",
        image: "",
        name: "",
        year: "",
        genre: "romance", // default genre
        durasi: "",
        sinopsis: ""
      });
    } else {
      alert("Semua kolom harus diisi!");
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    if (
      newFilm.name &&
      newFilm.year &&
      newFilm.genre &&
      newFilm.image &&
      newFilm.durasi &&
      newFilm.sinopsis
    ) {
      const updatedFilms = films.map((f) =>
        f.Id === newFilm.Id ? newFilm : f
      );
      setFilms(updatedFilms);
      localStorage.setItem("daftarfilm", JSON.stringify(updatedFilms));
      setShowForm(false);
      setNewFilm({
        Id: "",
        image: "",
        name: "",
        year: "",
        genre: "romance", // default genre
        durasi: "",
        sinopsis: ""
      });
      setEditMode(false);
    } else {
      alert("Semua kolom harus diisi!");
    }
  };

  const handleChange = (event) => {
    setNewFilm({ ...newFilm, [event.target.name]: event.target.value });
  };

  const handleDelete = (filmToDelete) => {
    const confirmation = window.confirm(`Apakah Anda yakin ingin menghapus film ${filmToDelete.name}?`);
    if (confirmation) {
      const updatedFilms = films.filter((f) => f.Id !== filmToDelete.Id);
      setFilms(updatedFilms);
      localStorage.setItem("daftarfilm", JSON.stringify(updatedFilms));
    }
  };

  const handleGenreFilter = (genre) => {
    setSearch(""); // Reset search when applying genre filter
    const filteredFilms = genre ? initialFilms.filter((f) => f.genre === genre) : films;
    setFilms(filteredFilms);
  };

  const handleLike = (filmId) => {
    const updatedFilms = films.map((f) =>
      f.Id === filmId ? { ...f, liked: !f.liked } : f
    );
    setFilms(updatedFilms);
    localStorage.setItem("daftarfilm", JSON.stringify(updatedFilms));
  };

  const sortedFilms = films.sort((a, b) => {
    const sortByValue = a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0;
    return sortOrder === "asc" ? sortByValue : -sortByValue;
  });

  const filteredFilms = sortedFilms.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("daftarfilm", JSON.stringify(films));
  }, [films]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-gray-300 flex flex-col items-center justify-center py-6 pt-14 mt-7">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-6xl w-full">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Film</h1>
        </div>
        <div className="flex flex-wrap justify-between mb-6">
          <label className="flex items-center gap-2 mb-2 md:mb-0">
            <span className="font-bold text-white"></span> Search:
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 p-2 text-sm rounded-lg border border-gray-500 outline-none"
            />
          </label>
          <label className="flex items-center gap-2 mb-2 md:mb-0">
            <span className="font-bold text-white"></span> Sort By:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 p-2 text-sm rounded-lg border border-gray-500 outline-none"
            >
              <option value="Id">ID</option>
              <option value="name">Nama</option>
              <option value="year">Tahun</option>
              <option value="genre">Genre</option>
            </select>
          </label>
          <label className="flex items-center gap-2 mb-2 md:mb-0">
            <span className="font-bold text-white"></span> Order:
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="h-9 p-2 text-sm rounded-lg border border-gray-500 outline-none"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </label>
          <button
            className="flex items-center gap-2 p-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={() => handleShowForm()}
          >
            <Plus /> Tambah
          </button>
        </div>
        <div className="flex flex-wrap justify-between mb-6">
          <button
            className={`flex items-center gap-2 p-2 text-sm ${
              !search && !sortBy && !sortOrder ? "bg-gray-600 text-white rounded-lg" : "bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            }`}
            onClick={() => handleGenreFilter("")}
          >
            Semua
          </button>
          <button
            className={`flex items-center gap-2 p-2 text-sm ${
              filteredFilms.length === 0 ? "bg-gray-600 text-white rounded-lg" : "bg-red-500 text-white rounded-lg hover:bg-red-600"
            }`}
            onClick={() => handleGenreFilter("horor")}
          >
            Horor
          </button>
          <button
            className={`flex items-center gap-2 p-2 text-sm ${
              filteredFilms.length === 0 ? "bg-gray-600 text-white rounded-lg" : "bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            }`}
            onClick={() => handleGenreFilter("komedi")}
          >
            Komedi
          </button>
          <button
            className={`flex items-center gap-2 p-2 text-sm ${
              filteredFilms.length === 0 ? "bg-gray-600 text-white rounded-lg" : "bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            }`}
            onClick={() => handleGenreFilter("romance")}
          >
            Romance
          </button>
          <button
            className={`flex items-center gap-2 p-2 text-sm ${
              filteredFilms.length === 0 ? "bg-gray-600 text-white rounded-lg" : "bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            }`}
            onClick={() => handleGenreFilter("action")}
          >
            Action
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFilms.map((film) => (
            <div key={film.Id} className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <img
                src={film.image}
                alt={film.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col justify-between">
                <h2 className="text-lg font-bold text-white">{film.name}</h2>
                <p className="text-sm text-gray-400">Genre: {film.genre}</p>
                <p className="text-sm text-gray-400">Tahun: {film.year}</p>
                <p className="text-sm text-gray-400">Durasi: {film.durasi} jam</p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    className={`text-lg ${film.liked ? 'text-red-500' : 'text-gray-400'}`}
                    onClick={() => handleLike(film.Id)}
                  >
                    <Heart />
                  </button>
                  <button
                      className="text-orange-500 hover:text-blue-700"
                      onClick={() => handleComment(film)}
                    >
                      <MessageCircleMore />
                    </button>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleShowForm(film)}
                    >
                      <Edit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(film)}
                    >
                      <Trash2 />
                    </button>
                    <button
                      className="text-yellow-500 hover:text-yellow-700"
                      onClick={() => handleInfo(film)}
                    >
                      <BadgeInfo />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showForm && (
          <form
            onSubmit={editMode ? handleEdit : handleAdd}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                onClick={() => setShowForm(false)}
              >
                ✖
              </button>
              <h2 className="text-2xl font-bold mb-6">{editMode ? "Edit Film" : "Tambah Film"}</h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Film"
                  value={newFilm.name}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="number"
                  name="year"
                  placeholder="Tahun Rilis"
                  value={newFilm.year}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                />
                <select
                  name="genre"
                  value={newFilm.genre}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                >
                  <option value="romance">Romance</option>
                  <option value="horor">Horor</option>
                  <option value="komedi">Komedi</option>
                  <option value="action">Action</option>
                </select>
                <input
                  type="text"
                  name="image"
                  placeholder="URL Gambar"
                  value={newFilm.image}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="number"
                  name="durasi"
                  placeholder="Durasi (jam)"
                  value={newFilm.durasi}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                />
                <textarea
                  name="sinopsis"
                  placeholder="Sinopsis"
                  value={newFilm.sinopsis}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="mt-6 p-2 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                {editMode ? "Update Film" : "Tambah Film"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Film;
