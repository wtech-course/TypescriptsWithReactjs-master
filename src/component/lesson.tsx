import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import LessonDataService from "../services/lesson.service";
import ILessonData from "../types/lesson.type"

interface RouterProps { // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentLesson: ILessonData;
    message: string;
}

export default class Tutorial extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);      
        this.getLesson = this.getLesson.bind(this);       
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);

        this.state = {
            currentLesson: {
                id: null,
                classRoom_Id: 0,
                lesson_Name: "",
                lesson_Time:0,
                lesson_Teacher_Name:""                
            },
     
            message: "",
        };
    }

    componentDidMount() {
        this.getLesson(this.props.match.params.id);
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        const lesson_Name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLesson: {
                    ...prevState.currentLesson,
                    lesson_Name: lesson_Name,
                },
            };
        });
    }
    onChangeTime(e: ChangeEvent<HTMLInputElement>) {
        const lesson_Time = Number(e.target.value);

        this.setState(function (prevState) {
            return {
                currentLesson: {
                    ...prevState.currentLesson,
                    lesson_Time: lesson_Time,
                },
            };
        });
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        const lesson_Teacher_Name = e.target.value;

        this.setState((prevState) => ({
            currentLesson: {
                ...prevState.currentLesson,
                lesson_Teacher_Name: lesson_Teacher_Name,
            },
        }));
    }
    

    getLesson(id: string) {
        LessonDataService.get(id)
            .then((response: any) => {
                this.setState({
                    currentLesson: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

 

        
    updateTutorial() {
        LessonDataService.update(
            this.state.currentLesson,
            this.state.currentLesson.id
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
        LessonDataService.delete(this.state.currentLesson.id)
            .then((response: any) => {
                console.log(response.data);
                this.props.history.push("/");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { currentLesson } = this.state;

        return (
            <div>
                {
                    <div className="edit-form">
                        <h4>Ders Ekleme Ekranı</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Ders Adı</label>
                                <input
                                    type="name"
                                    className="form-control"
                                    id="name"
                                    value={currentLesson.lesson_Name}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="teacher">Öğretim Görevlisi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="teacher"
                                    value={currentLesson.lesson_Teacher_Name}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Ders Süresi</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="time"
                                    value={currentLesson.lesson_Time}
                                    onChange={this.onChangeTime}
                                />
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
                }
            </div>
        );
    }
}
