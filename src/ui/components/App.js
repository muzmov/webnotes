import React from 'react'

const Header = (props) => (
    <h1>{props.title}</h1>
);

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {notes: [], selected: null};
    }

    componentDidMount() {
        fetch('/api/notes')
            .then(response => response.json())
            .then(notes => this.setState({notes}));
    }

    selectHandler = (id) => { this.setState({selected: id}) };

    render() {
        return (
            <React.Fragment>
                <Header title={'Persons'}/>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>text</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.notes.map((note, i) => (
                            <tr key={i}>
                                <td>{note.id}</td>
                                <td>{note.text}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
};
