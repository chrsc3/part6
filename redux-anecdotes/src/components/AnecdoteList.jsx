import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";
import Filter from "./Filter";

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return [...state.anecdotes].sort((a, b) => b.votes - a.votes);
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });
  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
    dispatch(
      notify(`You voted for '${anecdotes.find((a) => a.id === id).content}'`, 5)
    );
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anecdotes;
