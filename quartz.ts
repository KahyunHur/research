import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// ====================================================
// FolderPage 정렬 방식을 '파일 경로 역순'으로 덮어쓰기
// ====================================================

ExternalPlugin.FolderPage({
  sort: (f1, f2) => {
    // 1. 실제 파일의 경로(slug)를 가져옵니다.
    // (slug는 'folder/subfolder/note-name' 형태를 띱니다.)
    const path1 = f1.slug ?? ""
    const path2 = f2.slug ?? ""
    
    // 2. 경로 텍스트를 기준으로 역순(Z->A) 정렬을 수행합니다.
    return path2.localeCompare(path1, undefined, { numeric: true })
  }
})

// ====================================================

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
