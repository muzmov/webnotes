import PropTypes from "prop-types";
import TaskType from "../../task/type/TaskType";
import NoteType from "../../note/type/NoteType";

export default PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    tasks: PropTypes.arrayOf(TaskType).isRequired,
    notes: PropTypes.arrayOf(NoteType).isRequired
})