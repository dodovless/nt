
// 读取文件
function handleFiles() {
    let inputObj = document.getElementById("_selectedFile");
    var selectedFile = inputObj.files[0];                           // 获取读取的File对象
    var name = selectedFile.name;                                   // 读取选中文件的文件名
    var size = selectedFile.size;                                   // 读取选中文件的大小
    console.log("文件名:" + name + "大小：" + size);
    var reader = new FileReader();                                  // 这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile);                                // 读取文件的内容
    //
    reader.onload = function () {
        console.log("读取结果：\r\n", this.result);                  // 当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
        let json = JSON.parse(this.result);                         // 结果转JSON
        editor.minder.importJson(json)                              // 加载到思维导图中
    };
    inputObj.value = "";                                            // 重置INPUT控件
}

// 保存文件
var saveFile = function (data, filename) {
    if (!data) {
        console.error('Console.save: No data');
        return;
    }
    if (!filename) filename = 'console.json'
    if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], { type: 'text / json' }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text / json', a.download, a.href].join(': ');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
};
// 加载文件
var loadFile = function () {
    let inputObj = document.getElementById("_selectedFile");
    if (inputObj) { inputObj.click(); }
    else {
        inputObj = document.createElement('input')
        inputObj.setAttribute('id', '_selectedFile');
        inputObj.setAttribute('type', 'file');
        inputObj.setAttribute("style", 'visibility:hidden');
        document.body.appendChild(inputObj);
        // inputObj.addEventListener("click", function(e) { this.value = ""; }, false);
        inputObj.addEventListener("change", handleFiles, false);
        inputObj.click();
    }
}





// 导出数据
var exportData = function () {
    let data = editor.minder.exportJson();
    saveFile(data, data.root.data.text + ".json");
}
// 导入数据
var importData = function () {
    loadFile();
}



