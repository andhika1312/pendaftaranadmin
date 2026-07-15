// ======================================================
// Culture Roleplay Recruitment
// Netlify Function
// ======================================================

exports.handler = async (event) => {

    if (event.httpMethod !== "POST") {

        return {

            statusCode: 405,

            body: JSON.stringify({

                success: false,

                message: "Method Not Allowed"

            })

        };

    }

    try {

        const webhook = process.env.DISCORD_WEBHOOK;

        if (!webhook) {

            return {

                statusCode: 500,

                body: JSON.stringify({

                    success: false,

                    message: "DISCORD_WEBHOOK belum dikonfigurasi."

                })

            };

        }

        const payload = JSON.parse(event.body);

        const response = await fetch(webhook, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(payload)

        });

        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(errorText);

        }

        return {

            statusCode: 200,

            body: JSON.stringify({

                success: true,

                message: "Pendaftaran berhasil dikirim."

            })

        };

    } catch (error) {

        console.error("REGISTER ERROR:", error);

        return {

            statusCode: 500,

            body: JSON.stringify({

                success: false,

                message: error.message

            })

        };

    }

};