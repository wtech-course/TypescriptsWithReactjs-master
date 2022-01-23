import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import ClassRoomDataService from "../services/classroom.service";
import LessonDataService from "../services/lesson.service";
import IClassRoomData from '../types/classroom.type';
import ILessonData from '../types/lesson.type';
interface RouterProps { // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;


type State = ILessonData & {
    submitted: boolean
};

export default class AddLesson extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);
   

        this.state = {
            id: 0,
            classRoom_Id: 0,
            lesson_Name: "",
            lesson_Time: 0,
            lesson_Teacher_Name: "",
            submitted: false
        };
    }
    componentDidMount() {
        //ClassRoom ID alınıyor
        this.setState({
            classRoom_Id:Number(this.props.match.params.id)
        });
       console.log(Number(this.props.match.params.id));
    }
    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            lesson_Name: e.target.value
        });
    }
    onChangeNumber(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            lesson_Time: Number(e.target.value)
        });
    }
    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            lesson_Teacher_Name: e.target.value
        });
    }
    onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            //   address: e.target.value
        });
    }

    saveTutorial() {
        const data: ILessonData = {
            lesson_Name: this.state.lesson_Name,
            classRoom_Id: this.state.classRoom_Id,
            lesson_Time: this.state.lesson_Time,
            lesson_Teacher_Name: this.state.lesson_Teacher_Name
        };

        LessonDataService.create(data)
            .then((response: any) => {
                this.setState({
                    id: response.data.id,
                    classRoom_Id: response.data.classRoom_Id,
                    lesson_Name: response.data.lesson_Name,
                    lesson_Time: response.data.lesson_Time,
                    lesson_Teacher_Name: response.data.lesson_Teacher_Name,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    newTutorial() {
        this.setState({
            id: 0,
            classRoom_Id: 0,
            lesson_Name: "",
            lesson_Time: 0,
            lesson_Teacher_Name: "",
            submitted: false
        });
    }

    render() {
        const { submitted, classRoom_Id, lesson_Name,lesson_Time,lesson_Teacher_Name} = this.state;

        return (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>Kayıt Başarılı</h4>
                        <button className="btn btn-success" onClick={this.newTutorial}>
                            Kayıt Ekle
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Ders adı</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={lesson_Name}
                                onChange={this.onChangeTitle}
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Ders Süresi</label>
                            <input
                                type="number"
                                className="form-control"
                                id="time"
                                required
                                value={lesson_Time}
                                onChange={this.onChangeNumber}
                                name="time"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="university">Öğretim Görevlisi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="university"
                                required
                                value={lesson_Teacher_Name}
                                onChange={this.onChangeDescription}
                                name="university"
                            />
                        </div>
                       

                        <button onClick={this.saveTutorial} className="btn btn-success">
                            Kaydet
                        </button>
                    </div>
                )}
            </div>
        );
    }
}