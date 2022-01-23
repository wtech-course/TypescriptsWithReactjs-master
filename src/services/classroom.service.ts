import http from "../http-common";
import IClassRoomData from "../types/classroom.type"

class TutorialDataService {
  getAll() {
    return http.get<Array<IClassRoomData>>("/");
  }

  get(id: string) {
    return http.get<IClassRoomData>(`/${id}`);
  }

  create(data: IClassRoomData) {
    return http.post<IClassRoomData>("/", data);
  }

  update(data: IClassRoomData, id: any) {
    return http.put<any>(`/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/`);
  }

  findByTitle(title: string) {
    return http.get<Array<IClassRoomData>>(`/${title}`);
  }
}

export default new TutorialDataService();