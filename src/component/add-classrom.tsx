import { Component, ChangeEvent } from "react";
import ClassRoomDataService from "../services/classroom.service";
import IClassRoomData from '../types/classroom.type';
import {  Route } from "react-router-dom";
import TutorialsList from "../component/classroom-list";
type Props = {};

type State = IClassRoomData & {
  submitted: boolean
};

export default class AddTutorial extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: 0,
      classRoom_Name: "",
      school_Name: "",
      address: "",
      published: false,
      submitted: false
    };
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      classRoom_Name: e.target.value
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      school_Name: e.target.value
    });
  }
  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      address: e.target.value
    });
  }

  saveTutorial() {
    const data: IClassRoomData = {
      classRoom_Name: this.state.classRoom_Name,
      school_Name: this.state.school_Name,
      address: this.state.address
    };

    ClassRoomDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          classRoom_Name: response.data.classRoom_Name,
          school_Name: response.data.school_Name,
          address: response.data.address,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
        window.location.href = "/";
        debugger;
        // ClassRoomDataService.getAll();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: 0,
      classRoom_Name: "",
      school_Name: "",
      address: "",
      published: false,
      submitted: false
    });
  }

  render() {
    const { submitted, classRoom_Name, school_Name, address } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
        
           {/* //Sayfa Yönlendirilmesi */}
              <Route exact path={["/", "/classroom"]} component={TutorialsList} />
           
           
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Sınıf adı</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={classRoom_Name}
                onChange={this.onChangeTitle}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="university">Üniversite Adı</label>
              <input
                type="text"
                className="form-control"
                id="university"
                required
                value={school_Name}
                onChange={this.onChangeDescription}
                name="university"
              />
            </div>
            <div className="form-group">
              <label htmlFor="adres">Adres</label>
              <input
                type="text"
                className="form-control"
                id="adres"
                required
                value={address}
                onChange={this.onChangeAddress}
                name="adres"
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