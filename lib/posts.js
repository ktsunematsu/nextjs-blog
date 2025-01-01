import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);

const postsDirectory = path.join(process.cwd(), 'posts');

async function getAllPostIds() {
    const fileNames = await readdirAsync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = await readFileAsync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(gfm)
        .use(html, { sanitize: false })
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}

async function getAllPostsData() {
    const fileNames = await readdirAsync(postsDirectory);
    const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await readFileAsync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    }));

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export {
    getAllPostIds,
    getPostData,
    getAllPostsData,
};