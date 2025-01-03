class ProfileUtils {
  static getProfile() {
    return JSON.parse(localStorage.getItem("profile"));
  }

  static setProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  static removeProfile() {
    localStorage.removeItem("profile");
  }
}

export default ProfileUtils;
