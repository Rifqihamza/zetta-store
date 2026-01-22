import { createClient } from 'next-sanity'
import { getSanityConfig } from './env'

const config = getSanityConfig()

export const sanityClient = createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,
    useCdn: config.useCdn,
})

export const sanityWriteClient = createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,
    token: config.token,
    useCdn: false,
})

export default sanityClient
