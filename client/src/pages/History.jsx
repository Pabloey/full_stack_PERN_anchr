import { useState, useEffect } from "react";
import { LoadUserById } from '../services/User';
import { LoadUserSessions } from '../services/Session';
import { EditSessionTag, DestroySession } from '../services/Session';
import HistorySession from "../component/HistorySession";

function History(props) {
  const [user, setUser] = useState({});
  const [sessions, setSessions] = useState([]);
  const [newTagId, setNewTagId] = useState('');

  const getUser = async () => {
    let currentUser = await LoadUserById(props.user.id);
    setUser(currentUser);
  };
  const getSessions = async () => {
		const userSessions = await LoadUserSessions(localStorage.getItem('id'));
    let datedSess = userSessions.map((index) => {
      let date = new Date(index.createdAt)
      let newDate = date.toString().slice(4,15);
      return {...index, date: newDate};
    })
		setSessions(datedSess);
	};
  const changeSessTag = async (session, tag) => {
    let userTagIds = user.Tags.map((index) => {return index.id});
    if (userTagIds.includes(parseInt(newTagId))) {
      const newSess = await EditSessionTag(session, tag);
      setNewTagId('');
      getSessions();
    };
  };
  const deleteSess = async (sessionId) => {
    let deleted = await DestroySession(sessionId);
    console.log(deleted);
    getSessions();
  };

  useEffect(async () => {
    await getUser();
    getSessions();
  }, []);

  return (
    <div className="history-div">
      <div className="history-grid">
        <p className="history-date-col"><b>Date</b></p>
        <p className="history-tag-col"><b>Tag</b></p>
        <p className="history-time-col"><b>Time</b></p>
        {sessions.map((index) => (
          <HistorySession key={index.id} session={index} />
        ))}
      </div>
      {/* <table>
        <tr>
          <th>Date</th>
          <th>Tag</th>
          <th>Time</th>
        </tr>
        {sessions.map((index) => (
          <tr key={index.id}>
            <td>{index.date}</td>
            <td>{index.Tag.description}</td>
            <td>{index.timeSpent} mins</td>
            <td>
              <select value={newTagId} onChange={(e) => {setNewTagId(e.target.value)}}>
                <option value=''>--Select new tag--</option>
                {user.Tags.map((index) => (
                  <option key={index.id} value={index.id}>{index.description}</option>
                ))}
              </select>
            </td>
            <td><button onClick={() => changeSessTag(index.id, newTagId)}>Edit</button></td>
            <td><button onClick={() => deleteSess(index.id)}>Delete</button></td>
          </tr>
        ))}
      </table> */}
    </div>
  );
}

export default History;