import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    try {
        const response = await fetch('https://api.ngs.global:443/v1/nats/subjects/organization.request', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'authorization': 'nhg_2atLsmWBRcK7z3Mtu_DmLVjm3aHiYcfFQHoLrxWGhLtTZqhoPLfRN3rKmsmSWe',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: 'nombre-de-tu-organización'
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseBody = await response.json();

        // Decodificar el campo 'data' que está en base64
        const decodedData = Buffer.from(responseBody.data, 'base64').toString('utf8');

        // Regresar el objeto con los datos decodificados
        return new Response(JSON.stringify({ ...responseBody, data: decodedData }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
