import { Hono } from 'hono'
import projects from './routes/projects.js'

const app = new Hono()

app.route('/api/projects', projects)

export default app