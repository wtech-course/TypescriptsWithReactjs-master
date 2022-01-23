import { Component, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import IClassRoomData from '../types/classroom.type';
import ClassRoomDataService from "../services/classroom.service";
import ILessonData from '../types/lesson.type';
import LessonDataService from "../services/lesson.service"

type Props = {};

type State = {
    classrooms: Array<IClassRoomData>,
    currentClassroom: IClassRoomData | null,
    lessons:Array<ILessonData>,
    currentLesson:ILessonData | null,
    currentIndex: number,
    currentLessonIndex:number,
    searchTitle: string
};

export default class TutorialsList extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.retrieveLessons=this.retrieveLessons.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.setActiveLesson = this.setActiveLesson.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            classrooms: [],
            lessons:[],
            currentLesson:null,
            currentClassroom: null,
            currentIndex: -1,
            currentLessonIndex:-1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
        this.retrieveLessons();
    }

    onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
        const searchTitle = e.target.value;
        this.setState({
            searchTitle: searchTitle
        });
        //Search işlemi
        ClassRoomDataService.findByTitle(this.state.searchTitle)
            .then((response: any) => {
                console.log(response.data);

            })
            .catch((e: Error) => {
                console.log(e);
            });

    }

    retrieveTutorials() {
        ClassRoomDataService.getAll()
            .then((response: any) => {
                this.setState({
                    classrooms: response.data
                });
               
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    retrieveLessons() {
        LessonDataService.getAll()
            .then((response: any) => {
                this.setState({
                    lessons: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveTutorials();
        this.retrieveLessons();
        this.setState({
            currentClassroom: null,
            currentLesson:null,
            currentIndex: -1
        });
    }

    setActiveTutorial(tutorial: IClassRoomData, index: number) {
        this.setState({
            currentClassroom: tutorial,
            currentIndex: index
        });
    }
    setActiveLesson(lesson: ILessonData, index: number) {
        this.setState({
            currentLesson: lesson,
            currentLessonIndex: index
        });
    }
    searchTitle() {
        this.setState({
            currentClassroom: null,
            currentIndex: -1
        });

        ClassRoomDataService.findByTitle(this.state.searchTitle)
            .then((response: any) => {
                this.setState({
                    classrooms: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, classrooms,lessons,currentLesson, currentClassroom, currentIndex,currentLessonIndex } = this.state;

        return (
            <div>
  <div className="list row">
             

                <div className="col-md-6">
                    <h4>Sınıf Listesi</h4>
                    <ul className="list-group">
                        {classrooms && 
                            classrooms.map((tutorial: IClassRoomData, index: number) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveTutorial(tutorial, index)}
                                    key={index}
                                >
                                    {tutorial.classRoom_Name}
                                </li>
                            ))}
                    </ul>


                    <Link
                        to={"/add"}
                        className="m-3 btn btn-sm btn-success"
                    >
                        Sınıf  Ekle
                    </Link>

                </div>

                <div className="col-md-6">
                    {currentClassroom ? (
                        <div>
                            <h4>{currentClassroom.classRoom_Name} Bilgileri</h4>
                            <div>
                                <label>
                                    <strong>Sınıf Adı:</strong>
                                </label>{" "}
                                {currentClassroom.classRoom_Name}
                            </div>
                            <div>
                                <label>
                                    <strong>Üniversite Adı:</strong>
                                </label>{" "}
                                {currentClassroom.school_Name}
                            </div>
                            <div>
                                <label>
                                    <strong>Adres:</strong>
                                </label>{" "}
                                {currentClassroom.address}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentClassroom.published ? "Published" : "Pending"}
                            </div>

                            <Link
                                to={"/classroom/" + currentClassroom.id}
                                className="badge badge-warning"
                            >
                               Sınıf Düzenle
                            </Link>
                            <Link
                                to={"/add-lesson/" + currentClassroom.id}
                                className="badge badge-success"
                            >
                               Sınıfa Ait Ders Ekle
                            </Link>


                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Sınıf özellikleri için tıklayınız!</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ders adına göre arama"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Arama
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">


                    <h4>Ders Listesi</h4>

                    <ul className="list-group">
                        {lessons &&
                            lessons.map((lesson: ILessonData, index: number) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentLessonIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveLesson(lesson, index)}
                                    key={index}
                                >
                                    {lesson.lesson_Name}
                                </li>
                            ))}
                    </ul>


                   

                </div>

                <div className="col-md-6">
                    {currentLesson ? (
                        <div>
                            <h4>{currentLesson.lesson_Name} Bilgileri</h4>
                            <div>
                                <label>
                                    <strong>Sınıf No:</strong>
                                </label>{" "}
                                {currentLesson.classRoom_Id}
                            </div>
                            <div>
                                <label>
                                    <strong>Ders Süresi:</strong>
                                </label>{" "}
                                {currentLesson.lesson_Time}
                            </div>
                            <div>
                                <label>
                                    <strong>Öğretmen Adı:</strong>
                                </label>{" "}
                                {currentLesson.lesson_Teacher_Name}
                            </div>
                           

                            <Link
                                to={"/lesson/" + currentLesson.id}
                                className="badge badge-warning"
                            >
                               Ders Düzenle
                            </Link>
                            <Link
                                to={"/lesson/" + currentLesson.id}
                                className="badge badge-success"
                            >
                               Derse Ait Öğrenci Ekle
                            </Link>


                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Ders özellikleri için tıklayınız!</p>
                        </div>
                    )}
                </div>
            </div>
            </div>
          
            
        );
    }
}