import { RiFacebookBoxFill, RiInstagramLine } from 'react-icons/ri';
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-yellow-200 text-black p-20">
      <div className="flex justify-between">
        <div>
          <img className="h-20" src="https://i.ibb.co/FgMD1sc/BookLogo.png" alt="Logo" />
        </div>
        <div className="flex gap-20">
          <ul className="space-y-2">
            <li>Home</li>
            <li>All Books</li>
          </ul>
          <ul className="space-y-2">
            <li>Publisher</li>
            <li>Books</li>
          </ul>
          <ul className="space-y-2">
            <li>Contact</li>
            <li>Career</li>
          </ul>
        </div>
        <div className="flex gap-2 text-2xl">
          <RiFacebookBoxFill />
          <RiInstagramLine />
        </div>
      </div>
      <div className="flex w-full mt-20 gap-5">
        <p>Privacy Policy</p>
        <p>Terms & Condition</p>
        <p className="ml-auto"> &#169; Book Self {year}</p>
      </div>
    </div>
  );
}
