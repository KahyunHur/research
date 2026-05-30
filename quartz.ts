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
// 2. 사이드바 "파일 탐색기(Explorer)" 경로 역순 정렬
// ====================================================
ExternalPlugin.Explorer({
  sortFn: (a, b) => {
    // Explorer는 노드 구조(FileNode)를 사용하므로 실제 경로는 a.file.slug 에 존재합니다.
    // 폴더인 경우 file 속성이 없을 수 있으므로 폴더명(a.name)을 대체재로 사용합니다.
    const pathA = a.file?.slug ?? a.name ?? ""
    const pathB = b.file?.slug ?? b.name ?? ""

    // 경로 기준 역순(Z->A) 정렬
    return pathB.localeCompare(pathA, undefined, { numeric: true })
  }
})

// ====================================================

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
