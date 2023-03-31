import 'jest';
import { findByUserLogic } from "./bitacora.controller";

test('bitacora findByUser', () => {
    return findByUserLogic(new Date(), 'f65eb37d-5119-56fb-988a-1f465b0ca756').then(data => {
        expect(data).toStrictEqual([{"aDate": new Date('2023-04-02T06:00:00.000Z'), "content": "Hola content", "title": "Hola"}, {"aDate": new Date('2023-03-31T06:00:00.000Z'), "content": "jejejejeje", "title": "jeje"}, {"aDate": new Date('2023-03-30T06:00:00.000Z'), "content": "Hoy entrené pierna", "title": "Entreno de hoy"}]);
      });
});

test('bitacora findByUser fial', () => {
    return findByUserLogic("dwccwdcwcewd", 'f65eb37d-5119-56fb-988a-1f465b0ca756').then(data => {
        expect(data).toBe(null);
      });
});
