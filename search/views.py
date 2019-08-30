from django.shortcuts import render
from prideflagsearch.settings import DATA_FILE
import json

# Create your views here.

def index(request):
    dataPath = DATA_FILE
    sourceData = {'flags': [] }
    with open(dataPath) as dataFile:
        sourceData = json.load(dataFile)

    sourceData['flags'].sort(key=lambda x: x['name'])
        
    flagCount = len(sourceData['flags'])
    cleanedData = []
    for i in range(0,flagCount, 4):
        thisRow = []
        for j in range(0, 4):
            if (flagCount > i + j):
                sourceData['flags'][i + j]['colors'] = json.dumps(sourceData['flags'][i + j]['colors']);
                thisRow.append(sourceData['flags'][i + j])
        cleanedData.append(thisRow)
        
    flagWord = 'flags'
    
    if 1 == flagCount:
        flagWord = 'flag'
    
    context = {
        'flagData': cleanedData,
        'flagCount': flagCount,
        'flagWord': flagWord,
    }
    return render(request, 'search/index.html', context)
