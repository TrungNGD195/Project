import { Profile } from 'passport-google-oauth20';
export interface GoogleProfilePayload {
    email?: string;
    full_name?: string;
    providerId: string;
}
declare const GoogleStrategy_base: new (...args: any) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<GoogleProfilePayload>;
}
export {};
