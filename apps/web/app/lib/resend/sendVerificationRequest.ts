import {resend} from "./resend";
import MagicLinkEmail from "../../components/emails/MagicLinkEmail"
import {saveUser} from "../actions/saveUser";


export async function sendVerificationRequest(params: any, name: string) {
    const {identifier, url, provider, theme} = params
    const {host} = new URL(url)
    const token = new URL(url).searchParams.get('token') || null
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [identifier],
            subject: `Log in to ${host}`,
            text: text({url, host}),
            react: MagicLinkEmail({url, host})
        })

        await saveUser(identifier, name, token);

        return {success: true, data}
    } catch (error) {
        throw new Error('Failed to send the verification Email.')
    }
}

function text({url, host}: { url: string, host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
}