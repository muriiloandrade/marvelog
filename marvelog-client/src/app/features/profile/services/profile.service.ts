import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { ProfileData } from '@features/profile/models/profileData.dto';
import { PatchPass } from '@features/profile/models/updatePass.dto';

@Injectable()
export class ProfileService {
  private baseURL = `${environment.baseUrl}/v1/user`;

  constructor(private http: HttpClient) {}

  getProfileData() {
    return this.http.get<ProfileData>(`${this.baseURL}`);
  }

  patchProfileData(data: ProfileData) {
    return this.http.patch(`${this.baseURL}`, data);
  }

  patchPass(data: PatchPass) {
    return this.http.patch(`${this.baseURL}/pass`, data);
  }

  deleteProfile() {
    return this.http.delete(`${this.baseURL}`);
  }
}
