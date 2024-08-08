import { faker } from "@faker-js/faker/locale/zh_CN";
import { defineFakeRoute } from "vite-plugin-fake-server/client";

import { resultSuccess } from "./utils";

const token = faker.string.uuid();
const refreshToken = faker.string.uuid();

export default defineFakeRoute([
	{
		url: "/api/login",
		timeout: 1000,
		method: "post",
		// statusCode: 401,
		// response: () => ({ code: 401, message: "Unauthorized" }),
		// statusCode: 400,
		// response: () => ({ code: 404, message: "Not found" }),
		response: ({ body }) => {
			if (body.username === "admin" && body.password === "password") {
				return resultSuccess({
					userId: "1",
					avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/1280px-Felis_catus-cat_on_snow.jpg",
					username: "Admin",
					nickname: "Admin",
					description: "manager",
					roles: ["admin"],
					token,
					refreshToken,
				});
			}
			else {
				return resultSuccess({
					userId: "2",
					avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sheba1.JPG/800px-Sheba1.JPG",
					username: "Tom",
					nickname: "Tom",
					description: "employee",
					roles: ["common"],
					token,
					refreshToken,
				});
			}
		},
	},
	{
		url: "/api/logout",
		timeout: 1000,
		method: "post",
		response: () => resultSuccess({}),
	},
	{
		url: "/api/refresh-token",
		timeout: 1000,
		method: "post",
		response: () => resultSuccess({ token, refreshToken }),
	},
]);
