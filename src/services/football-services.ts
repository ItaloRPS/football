export const Football = {
    competitions: async () => {
       try {
        const url = `${process.env.APP_BASE_URL}/v4/competitions`
        const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-auth-token':`${process.env.AUTH_TOKEN}`
                },
            });

            if (!response.ok) {
                throw new Error('Unauthorized');
            }
            const result = await response.json();
            return {result, status: 200 };
        } catch (error) {
            throw new Error('Unauthorized');
        }
    },
    rouds: async (id:string|number, rouds?:number|undefined) => {
       try {
        const url = `${process.env.APP_BASE_URL}/v4/competitions/${id}/matches${rouds?`?matchday=${rouds}`:''}`
        const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-auth-token':`${process.env.AUTH_TOKEN}`
                },
            });

            if (!response.ok) {
                throw new Error('Unauthorized');
            }
            const result = await response.json();
            return {result, status: 200 };
        } catch (error) {
            throw new Error('Unauthorized');
        }
    },

    teams: async (id:string) => {
       try {
        const url = `${process.env.APP_BASE_URL}/v4/competitions/${id}/teams`
        const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-auth-token':`${process.env.AUTH_TOKEN}`
                },
            });

            if (!response.ok) {
                throw new Error('Unable to access data');
            }
            const result = await response.json();
            return {result, status: 200 };
        } catch (error) {
            throw new Error('Unable to access data');
        }
    }
};
