from django.shortcuts import render
from prideflagsearch.settings import DATA_FILE
import json
import re

# Create your views here.

def index(request):
    dataPath = DATA_FILE
    sourceData = {'flags': [] }
    with open(dataPath) as dataFile:
        sourceData = json.load(dataFile)

    sourceData['flags'].sort(key=lambda x: x['name'])
        
    flagCount = len(sourceData['flags'])
    cleanedData = []
    for i in range(0,flagCount):
        sourceData['flags'][i]['colors'] = json.dumps(sourceData['flags'][i]['colors']);
        
        sourceCount = len(sourceData['flags'][i]['citation']['sourceList'])
        for sourceIndex in range(0, sourceCount):
            sourceData['flags'][i]['citation']['sourceList'][sourceIndex] = createCitationStructure(sourceData['flags'][i]['citation']['sourceList'][sourceIndex])
        
        sourceData['flags'][i]['citation']['imageSource'] = createCitationStructure(sourceData['flags'][i]['citation']['imageSource'])
        sourceData['flags'][i]['citation']['firstAuthoring'] = createCitationStructure(sourceData['flags'][i]['citation']['firstAuthoring'])
        
        cleanedData.append(sourceData['flags'][i])
        
    flagWord = 'flags'
    
    if 1 == flagCount:
        flagWord = 'flag'
    
    context = {
        'flagData': cleanedData,
        'flagCount': flagCount,
        'flagWord': flagWord,
        'colorList': getColorFilters()
    }
    return render(request, 'search/index.html', context)

def getColorFilters():
    return [
        {
            'value': 'red',
            'fill': 'red',
            'label': 'Red'
        },
        {
            'value': 'orange',
            'fill': 'orange',
            'label': 'Orange'
        },
        {
            'value': 'yellow',
            'fill': 'yellow',
            'label': 'Yellow'
        },
        {
            'value': 'green',
            'fill': 'green',
            'label': 'Green'
        },
        {
            'value': 'blue',
            'fill': 'blue',
            'label': 'Blue'
        },
        {
            'value': 'purple',
            'fill': 'purple',
            'label': 'Purple'
        },
        {
            'value': 'pink',
            'fill': 'pink',
            'label': 'Pink'
        },
        {
            'value': 'black',
            'fill': 'black',
            'label': 'Black'
        },
        {
            'value': 'grey',
            'fill': 'grey',
            'label': 'Grey'
        },
        {
            'value': 'white',
            'fill': 'white',
            'label': 'White'
        },
        {
            'value': 'brown',
            'fill': 'brown',
            'label': 'Brown'
        },
        {
            'value': 'tan',
            'fill': 'tan',
            'label': 'Tan'
        }
    ];

def createCitationStructure(rawCitation): 
    if False == rawCitation:
        return {
            "type": "simple",
            "value": ""
        }
    
    apaCitationPartsRegex = re.compile('^(.*) from \[(.*)\]\((.*)\)(.*)$');
    thisCitationParts = apaCitationPartsRegex.search(rawCitation);
            
    if thisCitationParts is None or 4 != len(thisCitationParts.groups()):
        citationStructure = {
            "type": "simple",
            "value": rawCitation
        }

        return citationStructure
    else:
        # Add hyperlinked source
        firstPart = thisCitationParts.group(1);
        linkText = thisCitationParts.group(2);
        linkUrl = thisCitationParts.group(3);
        addendum = thisCitationParts.group(4);

        citationStructure = {
            "type": "complex",
            "firstPart": thisCitationParts.group(1),
            "linkText": thisCitationParts.group(2),
            "linkUrl": thisCitationParts.group(3),
            "addendum": thisCitationParts.group(4),
        }

        return citationStructure
