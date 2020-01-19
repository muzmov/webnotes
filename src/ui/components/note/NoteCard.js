import React from 'react'
import PropTypes from "prop-types";
import NoteType from "./type/NoteType";

class NoteCard extends React.Component {

    state = {
        note: Object.assign({}, this.props.note),
        isNew: !this.props.note
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.note !== newProps.note) {
            const note = Object.assign({}, newProps.note)
            this.setState({
                note,
                isNew: !newProps.note
            })
        }
    }

    changeHandler = (field, event) => {
        const note = Object.assign({}, this.state.note)
        if (note[field] !== event.target.value) {
            note[field] = event.target.value
            this.setState({note})
        }
    }

    render() {
        const note = this.state.note
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" id="taskTitleInput"
                                   placeholder="Название" value={note.title || ''} onChange={e => this.changeHandler('title', e)}/>
                        </div>
                        <div className="form-group">
                            <textarea rows="20" className="form-control" id="taskTextInput"
                                   placeholder="Название" value={note.text || ''} onChange={e => this.changeHandler('text', e)}/>
                        </div>
                    </form>

                    <button className="btn btn-primary" onClick={() => this.props.saveHandler(this.state.note)}>Сохранить</button>
                    {!this.state.isNew ? <button className="btn btn-secondary ml-1" onClick={() => this.props.deleteHandler(this.state.note)}>Удалить</button> : ''}
                </div>
            </div>
        )
    }
}

NoteCard.propTypes = {
    note: NoteType,
    deleteHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
}

export default NoteCard