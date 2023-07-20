import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Modal from 'react-modal';

const StudentTable = () => {
  const [grades, setGrades] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGradeChange = (studentId, aspect, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [aspect]: {
        ...prevGrades[aspect],
        [`mahasiswa_${studentId}`]: value,
      },
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  
  const groupGradesByAspect = () => {
    const groupedGrades = {};
    Object.entries(grades).forEach(([aspect, data]) => {
      const aspectName = `aspek_penilaian_${aspect.split('_')[2]}`;
      if (!groupedGrades[aspectName]) {
        groupedGrades[aspectName] = {};
      }
      Object.entries(data).forEach(([student, grade]) => {
        groupedGrades[aspectName][student] = grade;
      });
    });
    return groupedGrades;
  };

  return (
    <div>
      <table className="student-table">
        <thead>
          <tr>
            <th></th>
            <th>Nama Mahasiswa</th>
            <th>Aspek Penilaian 1</th>
            <th>Aspek Penilaian 2</th>
            <th>Aspek Penilaian 3</th>
            <th>Aspek Penilaian 4</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr key={index}>
              <td><FaUser /></td>
              <td>Mahasiswa {index + 1}</td>
              {[...Array(4)].map((_, aspectIndex) => (
                <td key={aspectIndex}>
                  <select
                    style={{ width: '120px', height: '40px' }} 
                    onChange={(e) =>
                      handleGradeChange(index + 1, `aspek_penilaian_${aspectIndex + 1}`, e.target.value)
                    }
                  >
                    {[...Array(10)].map((_, grade) => (
                      <option key={grade} value={grade + 1}>
                        {grade + 1}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="submit-button" onClick={() => setIsModalOpen(true)}>
        Simpan
      </button>
      
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <h2>Data Grades</h2>
        <pre>{JSON.stringify(groupGradesByAspect(), null, 2)}</pre>
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default StudentTable;
