/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useAppSelector } from "../redux/hooks/hooks";
import { useAddBookMutation } from "../redux/features/books/booksApi";
import swal from "sweetalert";
import { useNavigate } from "react-router";

interface IBookInfo {
  email: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  description?: string;
  reviews?: [];
}

const AddNewBook = () => {
  const navigate = useNavigate();

  const { email } = useAppSelector((state) => state.users.user);

  const [isLoad, setIsLoad] = useState(false);

  const [addBook] = useAddBookMutation();

  const [bookInfo, setBookInfo] = useState<IBookInfo>({
    email: "",
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    image: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setBookInfo({ ...bookInfo, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", "bb406e6aefacc44e37d7220991feb6f5"); // Replace with your ImageBB API key

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );
        const imageUrl = response.data.data.url;
        setBookInfo({ ...bookInfo, image: imageUrl });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Perform book submission logic here
    if (email) {
      bookInfo.email = email;
      bookInfo.reviews = [];
    }
    setIsLoad(true);
    const response: any = await addBook(bookInfo);
    if (response?.data) {
      swal(response?.data?.message, "", "success");
      // Reset the form fields
      setBookInfo({
        email: "",
        title: "",
        author: "",
        genre: "",
        publicationDate: "",
        image: "",
        description: "",
      });
      navigate("/all-books");
      setIsLoad(false);
    } else {
      swal("Book Added Failed", "", "error");
      setIsLoad(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add New Book</title>
      </Helmet>

      <div className="max-w-md mx-auto my-[50px]">
        <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="text-lg font-semibold mb-3">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookInfo.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="text-lg font-semibold mb-3">
              Author Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={bookInfo.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="text-lg font-semibold mb-3">
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              value={bookInfo.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            >
              <option  value="">Select Genre</option>
              <option value="Scary Story">Scary Story</option>
              <option value="Mystery">Mystery</option>
              <option value="Horror">Horror</option>
              <option value="Fantasy Horror">Fantasy Horror</option>
              <option value="Supernatural">Supernatural</option>
            </select>
           
          </div>
          <div className="mb-4">
            <label
              htmlFor="publicationDate"
              className="text-lg font-semibold mb-3"
            >
              Publication Date
            </label>
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              value={bookInfo.publicationDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="text-lg font-semibold mb-3">
              Book Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
              required
            />
          </div>
          {bookInfo.image && (
            <div className="mb-4">
              <img
                src={bookInfo.image}
                alt="Book Cover"
                className="max-w-full mb-2"
                height="350px"
                width="260px"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="description" className="text-lg font-semibold mb-3">
              Book description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={bookInfo.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            ></textarea>
          </div>
          {isLoad ? (
            <button
              disabled
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Add Book
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default AddNewBook;
