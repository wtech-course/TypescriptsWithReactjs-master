import http from "../http-common";
import ILessonData from "../types/lesson.type"

class TutorialDataService {
  getAll() {
    return http.get<Array<ILessonData>>("/lesson");
  }

  get(id: string) {
    return http.get<ILessonData>(`/lesson/${id}`);
  }

  create(data: ILessonData) {
    return http.post<ILessonData>("/lesson/add", data);
  }

  update(data: ILessonData, id: any) {
    return http.post<any>(`/lesson/update/${id}`, data);
  }

  delete(id: any) {
    return http.post<any>(`/lesson/delete/${id}`);
  }
  // findByTitle(title: string) {
  //   return http.get<Array<ILessonData>>(`/lesson/search/${title}`);
  // }
}

export default new TutorialDataService();