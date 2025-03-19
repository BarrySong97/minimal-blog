import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import Project from "./app/(payload)/collections/project";
import Blog from "./app/(payload)/collections/blog";
import { Media } from "./app/(payload)/collections/media";
import { s3Storage } from "@payloadcms/storage-s3";
import Experience from "./app/(payload)/collections/experience";
import Home from "./app/(payload)/collections/home";
import Skills from "./app/(payload)/collections/skills";
import SkillCategories from "./app/(payload)/collections/skill-categories";
import About from "./app/(payload)/collections/about";
import computeBlurhash from "payload-blurhash-plugin";
import Photo from "./app/(payload)/collections/photo";
export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),
  globals: [Home, About],
  // Define and configure your collections in this array
  collections: [
    Blog,
    Project,
    Experience,
    Media,
    Skills,
    SkillCategories,
    Photo,
  ],
  localization: {
    locales: ["en", "zh", "ja", "ko"], // required
    defaultLocale: "en", // required
  },
  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || "",

      config: {
        endpoint: process.env.S3_ENDPOINT || "",
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || "",
          secretAccessKey: process.env.S3_SECRET_KEY || "",
        },
        region: process.env.S3_REGION || "",
      },
    }),
    computeBlurhash({
      showBlurhashField: true,
    }),
  ],
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
});
