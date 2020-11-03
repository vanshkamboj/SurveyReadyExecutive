/**
 * Created by Yash Goel on 08 - sept - 2020
 * 
 */

import * as ApiConstants from "../Constants";


async function Api(headers, method, url, body) {

    const URL = `${ApiConstants.BASE_URL}${url}`;

    console.log(
        "\n=======================================" + "\n\n" +
        "Header ==>> " + JSON.stringify(headers) + "\n" +
        "METHOD ==>>  " + method + "\n" +
        "Api ==>>  " + URL + "\n" +
        "Request ==>>  " + body + "\n\n" +
        "======================================="
    )

    return fetch(URL, {
        headers: headers,
        timeout: 5000,
        method: method,
        body: body,
    })
        .then(async (response) => {
            const status = response.status;
            const data = await response.json();

            console.log(
                "\n=======================================" + "\n\n" +
                "status ==>> " + status + "\n" +
                "Response ==>>  " + JSON.stringify(data) + "\n\n" +
                "======================================="
            )

            return { status: status, response: data }

        })
        .catch(function (error) {
            alert("Internet connection is not available");
            console.log("Request failed", error);
        });
};


export const getUsersListApi = async () => {

    const URL = ApiConstants.users;
    return await Api("", "GET", URL, "")
};