<?xml version="1.0"?>
<xsl:stylesheet version="1.0" 
   xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
   xmlns:xlink="http://www.w3.org/1999/xlink" 
   xmlns="http://www.w3.org/1999/xhtml"
   >

<xsl:output
     method="xml"
     doctype-system="about:legacy-compat"
     omit-xml-declaration = "yes"
     encoding="UTF-8"
     indent="yes" />

 <xsl:template match="/">
   <html xmlns="http://www.w3.org/1999/xhtml">
     <head>
       <meta charset="utf-8"></meta>
       <title>Main page</title>
     </head>
     <body>
       <h1>
	 <xsl:value-of select="main/title"/>
       </h1>
       <p><xsl:value-of select="main/description"/> </p>
	   <xsl:apply-templates select="main/tasks"/>
     </body>
 </html>

 </xsl:template>

 <xsl:template match="tasks">
   <div style="clear:both;">
     <h1>Active tasks</h1>
     <xsl:apply-templates/>
   </div>
 </xsl:template>

 <!-- task - programmed as a big block for change -->

 <xsl:template match="task">
   <div style="float:left;border-style:solid;margin:10px;padding:5px;width:300px">
     <!-- title -->
     <p style="font-size:130%; font-weight:bold; background-color:#A2CD5A;">    
       <xsl:value-of select="count(preceding-sibling::*)+1"/>.
       <xsl:value-of select="title"/>
     </p>

     <!-- members and description -->
     <p>Executions required: <xsl:apply-templates select="MembersNeed"/></p>
	 <p>Already executed: <xsl:apply-templates select="MembersNow"/> times</p>
     <p style="font-style: italic;"><xsl:value-of select="description"/></p>

     
     <!-- completion -->
     <p>Completion: <xsl:value-of select="completion"/></p>
     <svg width="210" height="10" 
	  xmlns:xlink="http://www.w3.org/1999/xlink" 
	  xmlns="http://www.w3.org/2000/svg">
       <rect x="5" y="1" width="{completion/@level * 20}" height="5" fill="red" />
       <rect x="4" y="0" width="201" height="6" fill="none" stroke="black" />
     </svg>
     <xsl:apply-templates select="requirements"/>
   </div>
 </xsl:template>
   
   
 <xsl:template match="requirements">
   <div style="clear:both">
   Requirements:
   <ul><xsl:apply-templates/></ul>
   </div>
 </xsl:template>

 <xsl:template match="item">
   <li><xsl:apply-templates/></li>
 </xsl:template>

</xsl:stylesheet>
