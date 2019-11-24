import React from 'react'

class NoteCard extends React.Component {

    constructor(props) {
        super(props)
        const note = Object.assign({}, props.note)
        console.log(note)
        this.state = {
            note,
            isNewNote: !props.note
        }
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.note !== newProps.note) {
            const note = Object.assign({}, newProps.note)
            console.log(note)
            this.setState({
                note,
                isNewNote: !newProps.note
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

    saveHandler = () => {
        const note = Object.assign({priority: 1}, this.state.note)
        this.props.saveNoteHandler(note)
        this.setState({note: {}})
    }

    render() {
        const note = this.state.note
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <label htmlFor="noteTextInput">Что нужно сделать</label>
                        <div className="form-group">
                            <input type="text" className="form-control" id="noteTextInput"
                                   placeholder="Что надо сделать?" value={note.text || ''} onChange={e => this.changeHandler('text', e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="noteContextInput">Где и когда</label>
                            <input type="text" className="form-control" id="noteContextInput"
                                   placeholder="Контекст" value={note.context || ''} onChange={e => this.changeHandler('context', e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="notePriorityInput">Приоритет</label>
                            <select className="form-control" id="notePriorityInput" value={note.priority || ''} onChange={e => this.changeHandler('priority', e)}>
                                {[1, 2, 3, 4, 5].map(i => <option key={i} value={i}>{i}</option> )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="noteTextInput">Оценка времени</label>
                            <input type="text" className="form-control" id="noteTimeEstimationInput"
                                   placeholder="Оценка времени" value={note.timeEstimation || ''} onChange={e => this.changeHandler('timeEstimation', e)}/>
                        </div>
                    </form>

                    <button href="#" className="btn btn-primary" onClick={this.saveHandler}>Сохранить</button>
                    {!this.state.isNewNote ? <button className="btn btn-secondary ml-1" onClick={this.props.deleteNoteHandler}>Удалить</button> : ''}
                </div>
            </div>
        )
    }
}


export default NoteCard