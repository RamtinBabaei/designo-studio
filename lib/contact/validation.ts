export const serviceOptions = ['web-design','app-design','graphic-design','not-sure'] as const;
export type ContactFields = {name:string;email:string;phone:string;service:string;message:string;website:string;requestId:string};
export type FieldErrors = Partial<Record<keyof ContactFields,string>>;
export type ValidationResult = {ok:true;data:ContactFields}|{ok:false;errors:FieldErrors};
export function validateContact(input:unknown):ValidationResult {
 if(!input || typeof input!=='object' || Array.isArray(input))return {ok:false,errors:{name:'Please complete the form.'}};
 const raw=input as Record<string,unknown>;
 const keys=['name','email','phone','service','message','website','requestId'] as const;
 const data=Object.fromEntries(keys.map(k=>[k,typeof raw[k]==='string'?(raw[k] as string).trim():''])) as ContactFields;
 const errors:FieldErrors={};
 if(!data.name)errors.name='Can’t be empty';else if(data.name.length>100)errors.name='Use 100 characters or fewer';
 if(!data.email)errors.email='Can’t be empty';else if(data.email.length>254||! /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email))errors.email='Please use a valid email address';
 if(data.phone && (data.phone.length>40||! /^[+\d\s().-]{5,40}$/.test(data.phone)))errors.phone='Please use a valid phone number';
 if(!serviceOptions.includes(data.service as typeof serviceOptions[number]))errors.service='Choose a service';
 if(!data.message)errors.message='Can’t be empty';else if(data.message.length<10)errors.message='Tell us a little more (at least 10 characters)';else if(data.message.length>3000)errors.message='Use 3,000 characters or fewer';
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId))errors.requestId='Please refresh the page and try again.';
 data.email=data.email.toLowerCase();
 return Object.keys(errors).length ? {ok:false,errors}:{ok:true,data};
}
