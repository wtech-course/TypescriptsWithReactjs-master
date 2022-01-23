import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

import ClassRoomDataService from "../services/classroom.service";
import IClassRoomData from "../types/classroom.type";

interface RouterProps { // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentClassRoom: IClassRoomData;
    message: string;
}

export default class Tutorial extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.getTutorial = this.getTutorial.bind(this);       
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);

        this.state = {
            currentClassRoom: {
                id: null,
                classRoom_Name: "",
                school_Name: "",
                address:""
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getTutorial(this.props.match.params.id);
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        const classRoom_Name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentClassRoom: {
                    ...prevState.currentClassRoom,
                    classRoom_Name: classRoom_Name,
                },
            };
        });
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        const school_Name = e.target.value;

        this.setState((prevState) => ({
            currentClassRoom: {
                ...prevState.currentClassRoom,
                school_Name: school_Name,
            },
        }));
    }
    onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
        const address = e.target.value;

        this.setState((prevState) => ({
            currentClassRoom: {
                ...prevState.currentClassRoom,
                address: address,
            },
        }));
    }

    getTutorial(id: string) {
        ClassRoomDataService.get(id)
            .then((response: any) => {
                this.setState({
                    currentClassRoom: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

 

        
    updateTutorial() {
        ClassRoomDataService.update(
            this.state.currentClassRoom,
            this.state.currentClassRoom.id
        )
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    message: "Güncelleme başarılı.",
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    deleteTutorial() {
        ClassRoomDataService.delete(this.state.currentClassRoom.id)
            .then((response: any) => {
                console.log(response.data);
                this.props.history.push("/classroom");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { currentClassRoom } = this.state;

        return (
            <div>
                {currentClassRoom ? (
                    <div className="edit-form">
                        <h4>Sınıf Düzenleme Ekranı</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Sınıf Adı</label>
                                <input
                                    type="name"
                                    className="form-control"
                                    id="name"
                                    value={currentClassRoom.classRoom_Name}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="university">Üniversite adı</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="university"
                                    value={currentClassRoom.school_Name}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="adress">Adres</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="adress"
                                    value={currentClassRoom.address}
                                    onChange={this.onChangeAddress}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentClassRoom.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        
                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteTutorial}
                        >
                            Sil
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateTutorial}
                        >
                            Güncelle
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Bir sınıfa tıklayınız...</p>
                    </div>
                )}
            </div>
        );
    }
}
