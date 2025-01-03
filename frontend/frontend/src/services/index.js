import http from "../libs/http";

class ApiServices {
  static async getRooms(params) {
    let url = "/Room";
    const queryParams = new URLSearchParams(params).toString();
    if (queryParams) {
      url += `?${queryParams}`;
    }
    return await http.get(url);
  }

  static async createRoom(payload) {
    return await http.post("/Room", payload);
  }

  static async updateRoom(payload, roomId) {
    return await http.put(`/Room/${roomId}`, payload);
  }

  static async getRoomsByUserId(userId) {
    return await http.get(`/Room/Owner/${userId}`);
  }

  static async getRoomsNotActivated() {
    return await http.get("/Room/NotActivated");
  }

  static async getRoomById(id) {
    return await http.get(`/Room/${id}`);
  }

  static async getProvinces() {
    return await http.get("/Home/Provinces");
  }

  static async getDistricts(provinceCode) {
    return await http.get(`/Home/Provinces/${provinceCode}/Districts`);
  }

  static async register(payload) {
    return await http.post("/Auth/Register", payload);
  }

  static async login(payload) {
    return await http.post("/Auth/Login", payload);
  }

  static async getComments(roomId, userId) {
    return await http.get(`/Room/${roomId}/${userId}`);
  }

  static async addComment(payload) {
    return await http.post("/Room/Comment", payload);
  }

  static async getCommentsByOwnerId(userId) {
    return await http.get(`/Room/Comment/${userId}`);
  }

  static async sendMail(payload) {
    return await http.post("/Room/SendEmail", payload);
  }

  static async bookRoom(payload) {
    return await http.post("/Booking", payload);
  }

  static async getBookingsByOwnerId(userId) {
    return await http.get(`/Booking/${userId}`);
  }

  static async approveRoom(roomId) {
    return await http.post(`/Room/Approve/${roomId}`);
  }
}

export default ApiServices;
