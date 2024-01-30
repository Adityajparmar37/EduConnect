import { Link } from "react-router-dom";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";

const TableCard = ({ teacher, index, DeleteTeacher }) => {
  return (
    <tr
      className={`text-dark border-b-2 bg-white font-semibold hover:bg-gray-50`}
    >
      <td className={`w-4 p-4`}>
        <div className="flex items-center">{index + 1}</div>
      </td>
      <th
        scope="row"
        className={`whitespace-nowrap px-6 py-4 text-lg font-bold text-darkPrimary`}
      >
        {teacher.firstName} {teacher.lastName}
      </th>
      <td className={`px-6 py-4 text-lg`}>{teacher.email}</td>
      <td className={`px-6 py-4 text-lg`}>
        <h1 className={`rounded-lg p-1 text-lg`}>{teacher.phone}</h1>
      </td>
      <td className={`px-6 py-4`}>
        <div className="flex space-x-5">
          <Link to={`/updateTeacher/${teacher._id}`}>
            <button
              className={`p-2 text-2xl font-semibold duration-200 hover:rounded-full hover:bg-blue-400 hover:text-white dark:text-blue-500`}
            >
              <LiaUserEditSolid />
            </button>
          </Link>
          <button
            onClick={() => DeleteTeacher(teacher._id)}
            className={`p-2 text-2xl font-semibold duration-200 hover:rounded-full hover:bg-red-500 hover:text-white dark:text-red-500`}
          >
            <MdDelete />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableCard;
